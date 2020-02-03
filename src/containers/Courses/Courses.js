import React, {Component} from "react";
import CoursesTable from "../../components/CoursesTable/CoursesTable";
import Categories from "../../components/Categories/Categories";
import CourseTags from "../../components/CourseTags/CourseTags";
// import styles from './Courses.module.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Courses extends Component {
    render() {
        return (
            <div className="adminContent">
                <Tabs type={"card"}>
                    <TabPane tab="Courses" key="1">
                        <CoursesTable/>
                    </TabPane>
                    <TabPane tab="Categories" key="2">
                        <Categories/>
                    </TabPane>
                    <TabPane tab="Tags" key="3">
                        <CourseTags/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Courses;
