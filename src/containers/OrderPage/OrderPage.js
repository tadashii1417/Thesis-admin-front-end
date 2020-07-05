import React, {Component} from "react";
import styles from './Order.module.css';
import {Avatar, Breadcrumb, Card, Icon, message, Table} from "antd";
import {Link} from "react-router-dom";
import {displayDateTime} from "../../utils/date_util";
import {DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION} from "../../constants/dev_constant";
import {getOrders} from "../../services/orders_service";


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
                            <div>
                                <Avatar src={course.course.banner['240x135']} style={{marginRight: '10px'}}/>
                                <b>{course.course.name}</b>
                            </div>
                        )
                    }
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'payer.email',
            key: 'email',
        },
        {
            title: "Enroll at",
            key: 'enroll',
            dataIndex: "createdAt",
            render: date => displayDateTime(date)
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
