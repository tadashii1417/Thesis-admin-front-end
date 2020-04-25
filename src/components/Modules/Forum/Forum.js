import React, {Component} from "react";
import {Breadcrumb, Icon as AIcon, Table, message, Spin} from "antd";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";

import styles from './Forum.module.css';
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {getForumPosts} from "../../../services/forum_service";
import moment from "moment";
import config from "../../../config";

class Forum extends Component {
    state = {
        loading: true,
        module: {},
        posts: [],
        pagination: {},
        loadPosts: false
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            console.log(data);
            this.setState({module: data, loading: false});

            await this.fetchPosts({page: 1})
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    fetchPosts = async (params = {}) => {
        try {
            this.setState({loadingPosts: true});
            const {module} = this.state;
            const {data} = await getForumPosts(module.id, params.page);
            const pagination = {...this.state.pagination};
            pagination.total = data.totalPageCount * 10;
            this.setState({
                loadingPosts: false,
                posts: data.items,
                pagination
            });
        } catch (e) {
            message.info("No posts found !")
            this.setState({loadingPosts: false, posts: []})
        }
    }

    handleTableChange = (pagination) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchPosts({page: pagination.current})
    };

    columns = [
        {
            title: "Title",
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            render: (post, row) => <Link
                to={this.props.location.pathname + '/post/' + row.id + this.props.location.search}>
                {post}</Link>
        },
        {
            title: "Author",
            dataIndex: 'author',
            key: 'author',
            width: '20%',
            render: ({firstName, lastName}) => <span><AIcon type={'user'}/> {firstName + " " + lastName}</span>
        },
        {
            title: "Answer",
            dataIndex: 'answerCount',
            key: 'answer',
            align: 'center',
            width: '10%'
        },
        {
            title: "Created",
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '30%',
            render: time => moment(time, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')
        }
    ];

    render() {
        const {module, loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        const {instanceData: {intro}} = module;

        const {match, location} = this.props;
        const query = new URLSearchParams(location.search);

        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {query.get('course')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.FORUM].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.FORUM].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                    <div className={styles.description}>
                        {intro}
                    </div>
                </div>

                <div className="adminContent">
                    <Table columns={this.columns}
                           dataSource={this.state.posts}
                           pagination={this.state.pagination}
                           onChange={this.handleTableChange}
                           loading={this.state.loadPosts}
                           rowKey={'id'}/>
                </div>

            </>
        );
    }
}

export default Forum;
