import React, {Component} from "react";
import styles from "./Courses.module.css";
import {Typography, Button, Divider, Input} from "antd";
import CoursesTable from "../../../components/CoursesTable/CoursesTable";

const {Title} = Typography;
const {Search} = Input;

class Courses extends Component {
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.container}>
                    <Title level={4}>Courses</Title>
                    <Divider/>
                    <div className={styles.toolbar}>
                        <Button icon="plus" type="primary">
                            Add new
                        </Button>
                        {/*<Button icon="delete" type="danger">*/}
                      {/*    Delete*/}
                      {/*</Button>*/}
                        <Search
                            placeholder="Search Courses"
                            onSearch={value => console.log(value)}
                            className={styles.searchBox}
                            enterButton
                        />
                    </div>
                    <CoursesTable/>
                </div>
            </div>
        );
    }
}

export default Courses;
