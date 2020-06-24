import React, {Component} from "react";
import styles from "./NewQuestion.module.css";
import {Breadcrumb, Card, message} from "antd";
import {Link} from "react-router-dom";
import NewQuestionForm from "../../../components/Modules/Quiz/Question/NewQuestionForm";
import {httpErrorHandler} from "../../../utils/axios_util";
import {ServerErrors} from "../../../constants/server_error_constant";
import {insertBankQuestion} from "../../../services/question_bank_service";

class NewQuestion extends Component {

    addQuestionHandler = async (values, action) => {
        let key = "add-question";

        try {
            message.loading({content: "Loading", key});
            await insertBankQuestion(values);
            message.success({content: "New question has been inserted.", key});
            this.props.history.push('/questions');
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case (ServerErrors.INVALID_FRACTION_SINGLE_ANSWER):
                        message.error({
                            content: "Single choice must have one option with fraction 1 and others 0",
                            key
                        });
                        break;
                    case (ServerErrors.INVALID_FRACTION_SUM):
                        message.error({content: "Sum of all options fraction must be 1", key});
                        break;
                    default:
                        message.error({content: "Something went wrong", key});
                }
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/questions"}>Question</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>New question</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Create New Question
                    </div>
                </div>
                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <NewQuestionForm
                            isBankQuestion={true}
                            addQuestionHandler={this.addQuestionHandler}
                        />
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default NewQuestion;
