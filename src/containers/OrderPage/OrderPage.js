import React, {Component} from "react";
import styles from './Order.module.css';
import {Breadcrumb, Card, Icon, Timeline} from "antd";
import {Link} from "react-router-dom";
import {formatCalendarTime} from "../../utils/date_util";

const res = {
    "data": {
        "items": [
            {
                "id": 1,
                "status": "created",
                "paymentMethod": "momo",
                "createdAt": "2020-07-03T15:01:33.243Z",
                "items": [
                    {
                        "courseId": 1,
                        "unitPrice": 123000,
                        "course": {
                            "id": 1,
                            "name": "Free course",
                            "type": "offline",
                            "instructors": [
                                {
                                    "id": 3,
                                    "type": "instructor",
                                    "email": "ntncsebku@gmail.com",
                                    "username": "instructor",
                                    "lastName": "nguyen",
                                    "firstName": "nghia",
                                    "lastLogin": null,
                                    "lastLogout": null,
                                    "title": null,
                                    "biography": null
                                },
                                {
                                    "id": 6,
                                    "type": "instructor",
                                    "email": "tadashii1417@gmail.com",
                                    "username": "instructor123",
                                    "lastName": "duong",
                                    "firstName": "truong",
                                    "lastLogin": "2020-07-04T06:12:43.693Z",
                                    "lastLogout": null,
                                    "title": null,
                                    "biography": null
                                }
                            ],
                            "banner": {
                                "260x145": "https://storage.googleapis.com/lerna_storage/course_banners/9f0191cd-613a-4218-abba-d3fd6b2bbab1_260x145.png",
                                "310x175": "https://storage.googleapis.com/lerna_storage/course_banners/9f0191cd-613a-4218-abba-d3fd6b2bbab1_310x175.png",
                                "240x135": "https://storage.googleapis.com/lerna_storage/course_banners/9f0191cd-613a-4218-abba-d3fd6b2bbab1_240x135.png",
                                "origin": "https://storage.googleapis.com/lerna_storage/course_banners/9f0191cd-613a-4218-abba-d3fd6b2bbab1.png"
                            }
                        }
                    }
                ],
                "payer": {
                    "id": 2,
                    "type": "learner",
                    "email": "trongnghianguyen1998@gmail.com",
                    "username": null,
                    "lastName": "Nguyễn",
                    "firstName": "Trọng Nghĩa",
                    "lastLogin": "2020-07-04T05:12:21.349Z",
                    "lastLogout": null,
                    "title": null,
                    "biography": null
                }
            },
            {
                "id": 2,
                "status": "created",
                "paymentMethod": "momo",
                "createdAt": "2020-07-04T02:46:16.091Z",
                "items": [
                    {
                        "courseId": 2,
                        "unitPrice": 123000,
                        "course": {
                            "id": 2,
                            "name": "Free course",
                            "type": "offline",
                            "instructors": [],
                            "banner": {
                                "310x175": "https://storage.googleapis.com/lerna_storage/course_banners/a9a8bd7d-aecd-4a9d-94b2-8fe1b92eca56_310x175.png",
                                "260x145": "https://storage.googleapis.com/lerna_storage/course_banners/a9a8bd7d-aecd-4a9d-94b2-8fe1b92eca56_260x145.png",
                                "240x135": "https://storage.googleapis.com/lerna_storage/course_banners/a9a8bd7d-aecd-4a9d-94b2-8fe1b92eca56_240x135.png",
                                "origin": "https://storage.googleapis.com/lerna_storage/course_banners/a9a8bd7d-aecd-4a9d-94b2-8fe1b92eca56.png"
                            }
                        }
                    }
                ],
                "payer": {
                    "id": 2,
                    "type": "learner",
                    "email": "trongnghianguyen1998@gmail.com",
                    "username": null,
                    "lastName": "Nguyễn",
                    "firstName": "Trọng Nghĩa",
                    "lastLogin": "2020-07-04T05:12:21.349Z",
                    "lastLogout": null,
                    "title": null,
                    "biography": null
                }
            }
        ],
        "pageSize": 2,
        "currentPage": 1,
        "totalPageCount": 4,
        "totalItemCount": 7,
        "remainingItemCount": 5,
        "url": "/api/orders/",
        "next": "/api/orders/?pageSize=2&page=2",
        "prev": null
    }
}

class OrderPage extends Component {

    render() {
        let {data: {items}} = res;

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
                        <Timeline>

                            {items.map(order => {
                                const {createdAt, items, payer} = order;
                                return (
                                    <Timeline.Item>
                                        <div>{formatCalendarTime(createdAt)}</div>
                                    </Timeline.Item>
                                )
                            })}

                        </Timeline>
                    </Card>
                </div>
            </React.Fragment>
        );
    }

}

export default OrderPage;
