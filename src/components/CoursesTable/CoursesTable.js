import React, {Component} from "react";
import {Table, Tag, Badge, Avatar, message} from "antd";
import styles from './CoursesTable.module.css';
import {Typography, Button, Divider, Input} from "antd";
import {Link} from 'react-router-dom';
import {httpErrorHandler} from "../../utils/axios_util";
import axios from '../../axios-config';

const {Title} = Typography;
const {Search} = Input;

const columns = [
    {
        title: "Banner",
        dataIndex: "banner",
        key: "banner",
        render: (src) => {
            if (src) {
                return <Avatar shape="square" size={64} src={src['220x135']}/>
            } else {
                return <Avatar shape="square" size={64} icon={"file-image"}/>
            }
        }
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, row) => <Link to={'/courses/' + row.slug}>{text}</Link>
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "Visibility",
        dataIndex: "visibility",
        key: "visibility"
    },
    {
        title: "Price",
        key: "price",
        dataIndex: "priceResult",
        render: res => (res.price.amount + " " + res.price.currency)
    },
    {
        title: "Instructors",
        dataIndex: "instructors",
        key: "instructors",
        render: items => (
            <span>
                {items.map(item => item)}
            </span>
        )
    }
];

export default class extends Component {
    state = {
        data: [],
        pagination: {},
        loading: false
    };

    componentDidMount() {
        this.fetchCourses({page: 1});
    }

    async fetchCourses(params = {}) {
        this.setState({loading: true});
        try {
            const {data} = await axios.get('/api/courses?page=' + params.page);
            const pagination = {...this.state.pagination};
            pagination.total = data.totalPageCount * 10;
            this.setState({
                loading: false,
                data: data.items,
                pagination
            });
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.info("No course found !")
                        this.setState({loading: false, data: []})
                }
            })
        }
    }

    handleTableChange = (pagination) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        console.log(pagination);
        this.fetchCourses({page: pagination.current})
    };

    render() {
        return (
            <div className={styles.container}>
                <Title level={4}>Courses</Title>
                <Divider/>
                <div className={styles.toolbar}>
                    <Link to="new-course">
                        <Button icon="plus" type="primary">
                            Add new
                        </Button>
                    </Link>
                    <Search
                        placeholder="Search Courses"
                        onSearch={value => console.log(value)}
                        className={styles.searchBox}
                        enterButton
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    rowKey={record => record.id}
                    // size={"small"}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    style={{background: '#fff'}}
                />
            </div>
        );
    };
}
