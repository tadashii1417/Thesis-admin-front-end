import React, {Component, Suspense} from "react";
import {Icon as AIcon, Table, message, Spin, Button, Modal} from "antd";
import {Link} from "react-router-dom";
import {ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createForumPosts, getForumPosts} from "../../../services/forum_service";
import moment from "moment";
import config from "../../../config";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

const NewForumPost = React.lazy(() => import("../../NewForumPost/NewForumPost"));

class Forum extends Component {
    state = {
        loading: true,
        module: {},
        posts: [],
        addPost: false,
        pagination: {},
        loadPosts: false
    };

    onAddPostOk = () => {
        this.setState({addPost: true});
    }

    onAddPostCancel = () => {
        this.setState({addPost: false});
    }

    handleNewPost = async (title, content) => {
        try {
            const {data} = await createForumPosts(this.state.module.id, title, content);
            data.author = this.props.user;
            const newPosts = [...this.state.posts];
            newPosts.push(data);
            message.success("New posts added.");
            this.setState({posts: newPosts, addPost: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
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

    handleEditModule = async (patch) => {
        const {module} = this.state;
        let key = "update-module";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateModule(module.id, patch);
            data.instanceData = module.instanceData;
            this.setState({module: data});
            message.success({content: "Module has been updated", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error({content: "Something went wrong", key});
            })
        }
    };

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
                to={{
                    pathname: this.props.location.pathname + '/post/' + row.id,
                    state: {module: this.state.module, post: row, courseName: this.props.location.state.courseName}
                }}>
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
        if (loading) return <Spin/>;

        const {instanceData: {intro}} = module;
        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout slug={slug}
                          courseName={courseName}
                          moduleType={ModuleType.FORUM}
                          module={module}
                          handleEditModule={this.handleEditModule}
                          moduleDescription={intro}>

                <Table columns={this.columns}
                       dataSource={this.state.posts}
                       pagination={this.state.pagination}
                       onChange={this.handleTableChange}
                       loading={this.state.loadPosts}
                       rowKey={'id'}/>

                <div><Button type={"primary"} onClick={this.onAddPostOk}>Add Post</Button></div>

                <Modal visible={this.state.addPost}
                       onCancel={this.onAddPostCancel}
                       footer={null}>
                    <Suspense fallback={null}>
                        <NewForumPost handleNewPost={this.handleNewPost}/>
                    </Suspense>
                </Modal>

            </ModuleLayout>
        );
    }
}

export default Forum;
