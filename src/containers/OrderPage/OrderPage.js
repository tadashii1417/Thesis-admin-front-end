import React, {Component} from "react";
import styles from './Order.module.css';
import {Avatar, Breadcrumb, Card, Icon, message, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {displayDateTime} from "../../utils/date_util";
import {DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION, defaultCourseImage} from "../../constants/dev_constant";
import {getOrders} from "../../services/orders_service";
import {getDisplayName} from "../../utils/string_util";


class OrderPage extends Component {
    state = {
        orders: [],
        pagination: DEFAULT_PAGINATION
    }

    async componentDidMount() {
        try {
            await this.fetchOrders({page: 1, pageSize: DEFAULT_PAGE_SIZE});
        } catch (e) {
            message.error("Fetch orders failed");
        }
    }

    fetchOrders = async (params = {}) => {
        try {
            const {data} = await getOrders(params.page, params.pageSize)
            const pagination = {...this.state.pagination};
            pagination.total = data.totalItemCount;
            this.setState({
                orders: data.items,
                pagination
            })
        } catch (e) {
            message.error("Fetch order failed");
        }
    }

    handleTableChange = ({current, pageSize}) => {
        const pager = {...this.state.pagination};
        pager.current = current;
        pager.pageSize = pageSize;
        this.setState({pagination: pager});

        if (pager.pageSize !== pageSize) current = 1;
        this.fetchOrders({page: current, pageSize: pageSize})
    };
    columns = [
        {
            title: "Courses",
            key: "courses",
            render: ({items}) => {
                return items.map(course => {
                        return (
                            <div style={{padding: '5px'}}>
                                <Avatar src={course.course.banner ? course.course.banner['240x135'] : defaultCourseImage}
                                        style={{marginRight: '10px'}}/>
                                <b>{course.course.name}</b>
                            </div>
                        )
                    }
                )
            }
        },
        {
            title: "Name",
            dataIndex: 'payer',
            key: 'name',
            render: text => getDisplayName(text)
        },
        {
            title: 'Email',
            dataIndex: 'payer.email',
            key: 'email',
        },
        {
            title: "Created at",
            key: 'enroll',
            dataIndex: "createdAt",
            render: date => displayDateTime(date)
        },
        {
            title: "Status",
            key: 'status',
            dataIndex: "status",
            render: text => {
                let color;
                switch (text) {
                    case 'created':
                        color = 'green';
                        break;
                    case 'success':
                        color = 'geekblue';
                        break;
                    default:
                        color = 'volcano';
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                );
            }
        }
    ];

    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/"}><Icon type="home"/></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Semester</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Order history
                    </div>
                    <div className={styles.description}>
                        This page show order history from students.
                    </div>
                </div>
                <div className={styles.mainForm}>
                    <Card bordered={false}>

                        <Table columns={this.columns}
                               dataSource={this.state.orders}
                               pagination={this.state.pagination}
                               onChange={this.handleTableChange}
                               rowKey={'id'}/>
                    </Card>
                </div>
            </React.Fragment>
        );
    }

}

export default OrderPage;
