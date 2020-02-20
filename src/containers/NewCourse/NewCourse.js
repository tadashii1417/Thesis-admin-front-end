import React, {Component} from "react";
import styles from './NewCourse.module.css';
import {Breadcrumb, Card} from "antd";
import NewCourseForm from "./NewCourseForm";
import {Link} from "react-router-dom";


class NewCourse extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>New course</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Create New Course
                    </div>
                    <div className={styles.description}>
                        This page allow admin to create new course, start with some basis information.
                    </div>
                </div>
                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <NewCourseForm/>
                    </Card>
                </div>
            </React.Fragment>
        );
    }

}

export default NewCourse;