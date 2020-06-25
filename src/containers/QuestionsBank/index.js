import React, {Component} from "react";
import {Tabs} from 'antd';
import QuestionCategories from "./QuestionCategories/QuestionCategories";
import BankQuestionsPage from "./BankQuestionsPage/BankQuestionsPage";

const {TabPane} = Tabs;

class QuestionBank extends Component {
    render() {
        return (
            <div className="adminContent">
                <Tabs type={"card"}>
                    <TabPane tab="Questions" key="1">
                        <BankQuestionsPage/>
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
