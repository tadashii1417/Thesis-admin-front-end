import React, {Component} from "react";
import {Typography, Divider} from "antd";
import BankQuestions from "../../../components/BankQuestions/BankQuestion";

const {Title} = Typography;

class BankQuestionsPage extends Component {

    render() {
        return (
            <div>
                <Title level={4}>Question Bank</Title>
                <Divider/>
                <BankQuestions/>
            </div>
        );
    }
}

export default BankQuestionsPage;
