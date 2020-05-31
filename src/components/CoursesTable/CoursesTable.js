import React, {Component} from "react";
import {message, Row, Col, Card, Rate, Pagination} from "antd";
import Tag from "../Tag/Tag";
import styles from './CoursesTable.module.css';
import {Typography, Button, Divider, Input} from "antd";
import {Link} from 'react-router-dom';
import {httpErrorHandler} from "../../utils/axios_util";
import {getCourseForInstructor, getCoursesForAdmin} from "../../services/course_service";

const {Title} = Typography;
const {Search} = Input;

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
            if (this.props.isAdmin) {
                const {data} = await getCoursesForAdmin(params.page);
                const pagination = {...this.state.pagination};
                pagination.total = data.totalPageCount * 10;
                this.setState({
                    loading: false,
                    data: data.items,
                    pagination
                });
            } else {
                const {data} = await getCourseForInstructor();
                this.setState({data: data})
            }

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

    handlePageChange = (page) => {
        const pager = {...this.state.pagination};
        pager.current = page;
        this.setState({
            pagination: pager,
        });
        this.fetchCourses({page: page})
    };

    render() {
        const gutter = [16, {xs: 16, sm: 16, md: 24, lg: 32}];
        const defaultImg = "https://yeah1network.com/img/image.jpeg";

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

                <div className={styles.courseContainer}>
                    <div className={styles.pagination}>
                        <Pagination {...this.state.pagination} onChange={this.handlePageChange}/>
                    </div>

                    <Row gutter={gutter}>
                        {this.state.data.map(course => {
                            const {id, name, slug, type, instructors, visibility, banner, priceResult} = course;
                            return <Col key={id} sm={12} md={8} lg={8}>
                                <Card
                                    size="small"
                                    className={styles.CourseCard}
                                    cover={
                                        <Link to={"/courses/" + slug}>
                                            <img className={styles.courseImage} alt={name}
                                                 src={banner ? banner.origin : defaultImg}/>
                                        </Link>
                                    }>
                                    <div className={styles.courseTag}>
                                        <div><Tag value="offline"/></div>
                                        <div><Tag value="remote"/></div>
                                    </div>

                                    <div className={styles.courseInfo}>
                                        <div className={styles.courseName}><Link to={"/courses/" + slug}>{name}</Link>
                                        </div>

                                        <div>{instructors && instructors.map(i => i.firstName)}</div>

                                        <div className={styles.courseRating}>
                                            <Rate defaultValue={4} disabled/>
                                            <b>4.5</b>
                                        </div>

                                        <div className={styles.priceContainer}>
                                            <div className={styles.originalPrice}>{"10 000 VND"}</div>
                                            <div className={styles.salePrice}>{"9 000 VND"}</div>
                                        </div>

                                    </div>
                                </Card>
                            </Col>
                        })}
                    </Row>
                </div>
            </div>
        );
    };
}
