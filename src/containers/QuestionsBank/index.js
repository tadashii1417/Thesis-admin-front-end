import React, {Component} from "react";
import {Tabs} from 'antd';
import Loading from "../../components/Loading/Loading";

const QuestionCategories = React.lazy(() => import("./QuestionCategories/QuestionCategories"));
const BankQuestionsPage = React.lazy(() => import("./BankQuestionsPage/BankQuestionsPage"));

const {TabPane} = Tabs;

class QuestionBank extends Component {
    render() {
        return (
            <div className="adminContent">
                <Tabs type={"card"}>
                    <TabPane tab="Questions" key="1">
                        <React.Suspense fallback={<Loading/>}>
                            <BankQuestionsPage/>
                        </React.Suspense>
                    </TabPane>
                    <TabPane tab="Categories" key="2">
                        <React.Suspense fallback={<Loading/>}>
                            <QuestionCategories/>
                        </React.Suspense>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default QuestionBank;
