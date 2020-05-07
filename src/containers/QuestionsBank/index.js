import React, {Component} from "react";
import {Tabs} from 'antd';
import Questions from "./Questions/Questions";
import QuestionCategories from "./QuestionCategories/QuestionCategories";

const {TabPane} = Tabs;

class QuestionBank extends Component {
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

export default QuestionBank;
