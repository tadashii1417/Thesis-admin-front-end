import React, {Component} from "react";
import {Button, Divider, Collapse, Icon, Result, Spin, message, Modal} from "antd";
import styles from './Quiz.module.css';
import * as QuestionTypes from './QuestionTypes';
import QuestionEdit from "./Question/QuestionEdit";
import {httpErrorHandler} from "../../../utils/axios_util";
import {fetchQuizQuestions, insertQuizQuestionByHand} from "../../../services/quiz_service";
import QuestionEditForm from "./Question/QuestionEditForm";

const {Panel} = Collapse;

const genExtra = () => {
    return (
        <React.Fragment>
            <Icon type={"edit"} theme={"twoTone"}/>
            <Divider type={"vertical"}/>
            <Icon type={"delete"} theme={"twoTone"} twoToneColor={"#eb2f96"}/>
        </React.Fragment>
    );
};

export default class extends Component {
    state = {
        questions: [],
        loading: true,
        openModal: false
    };

    async componentDidMount() {
        try {
            const {data} = await fetchQuizQuestions(this.props.moduleId);
            this.setState({questions: data, loading: false})
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong")
                }
            })
        }
    }

    handleCancel = () => {
        this.setState({openModal: false})
    };

    handleOpenModal = () => {
        this.setState({openModal: true})
    };

    addQuestionHandler = async (values) => {
        try {
            const {data} = await insertQuizQuestionByHand(this.props.moduleId, values);
            console.log(data);
            message.success("New question has been inserted.");

            let newList = [...this.state.questions];
            newList.push(data);
            this.setState({questions: newList, openModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    render() {
        const {loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        return (
            <div>
                {
                    this.state.questions.length ? "" : <Result
                        status="404"
                        subTitle="There is no question yet, please add more !"
                    />
                }

                <div className={styles.quizContainer}>
                    <h4>Question list</h4>
                    <Divider className={styles.divider}/>
                    <Collapse accordion>
                        {this.state.questions.map(item => (
                            <Panel key={item.id} header={item.content} extra={genExtra()}>
                                <QuestionEdit question={item}/>
                            </Panel>
                        ))}
                    </Collapse>
                    <Divider/>

                    <div>
                        <Button onClick={this.handleOpenModal}>Add</Button>
                        <Divider type={"vertical"}/>
                        <Button type={"primary"}>Save</Button>
                    </div>

                    <Modal title={"Add new question"}
                           visible={this.state.openModal}
                           onCancel={this.handleCancel}
                           bodyStyle={{padding: "12px 20px"}}
                           style={{top: 20}}
                           width={'60%'}
                           footer={null}>
                        <QuestionEditForm addQuestionHandler={this.addQuestionHandler}/>
                    </Modal>
                </div>
            </div>

        );
    }
}
