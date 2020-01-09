import React, {Component} from "react";
import '../admin.css';
import {Tabs} from 'antd';
import Questions from "./Questions/Questions";
import QuestionCategories from "./QuestionCategories/QuestionCategories";

const {TabPane} = Tabs;

class Courses extends Component {
    render() {
        return (
            <div className="adminContent">
                <Tabs type={"card"}>
                    <TabPane tab="Questions" key="1">
                        <Questions/>
                    </TabPane>
                    <TabPane tab="Categories" key="2">
                        <QuestionCategories/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Courses;
