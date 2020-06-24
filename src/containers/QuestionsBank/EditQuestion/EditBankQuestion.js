import React, {Component} from "react";
import styles from "../NewQuestion/NewQuestion.module.css";
import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import EditQuestionBankForm from "./EditBankQuestionForm";

class EditBankQuestion extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/questions"}>Question</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Edit question</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Edit Question
                    </div>
                </div>
                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <EditQuestionBankForm id={this.props.match.params.id}/>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default EditBankQuestion;
