import React, {Component} from "react";
import {Button, Divider, Collapse, Icon, Result, Spin, message, Modal} from "antd";
import styles from './Quiz.module.css';
import QuestionEdit from "./Question/QuestionDetail";
import {httpErrorHandler} from "../../../utils/axios_util";
import {fetchQuizQuestions, insertQuizQuestionByHand} from "../../../services/quiz_service";


import NewQuestionForm from "./Question/NewQuestionForm";
import QuestionEditForm from "./Question/QuestionEditForm";

const {Panel} = Collapse;


export default class extends Component {
    state = {
        questions: [],
        loading: true,
        openModal: false,
        editModal: false,
        selectedQuestion: null
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

    genExtra = (question) => {
        return (
            <React.Fragment>
                <Button onClick={(e) => this.handleEditModal(question, e)}>
                    <Icon type={"edit"} theme={"twoTone"}/>
                </Button>
                <Divider type={"vertical"}/>
                <Button>
                    <Icon type={"delete"} theme={"twoTone"} twoToneColor={"#eb2f96"}/>
                </Button>
            </React.Fragment>
        );
    };

    handleCancel = () => {
        this.setState({openModal: false})
    };

    handleOpenModal = () => {
        this.setState({openModal: true})
    };

    handleCancelEdit = () => {
        this.setState({editModal: false})
    };

    handleEditModal = (question, e) => {
        e.stopPropagation();
        this.setState({editModal: true, selectedQuestion: question})
    };

    addQuestionHandler = async (values) => {
        try {
            const {data} = await insertQuizQuestionByHand(this.props.moduleId, values);
            message.success("New question has been inserted.");

            let newList = [...this.state.questions];
            newList.push(data);
            this.setState({questions: newList, openModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                // TODO: add more specific cases !!!
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

                <div className={styles.quizContainer}>
                    <h4>Question list</h4>
                    <Divider className={styles.divider}/>
                    {
                        this.state.questions.length ? "" : <Result
                            status="404"
                            subTitle="There is no question yet, please add more !"
                        />
                    }
                    <Collapse accordion>
                        {this.state.questions.map(item => (
                            <Panel key={item.id} header={item.content} extra={this.genExtra(item)}>
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
                        <NewQuestionForm addQuestionHandler={this.addQuestionHandler}/>
                    </Modal>

                    <Modal title={"Edit question"}
                           visible={this.state.editModal}
                           onCancel={this.handleCancelEdit}
                           bodyStyle={{padding: "12px 20px"}}
                           style={{top: 20}}
                           width={'60%'}
                           footer={null}>
                        <QuestionEditForm data={this.state.selectedQuestion}/>
                    </Modal>
                </div>
            </div>

        );
    }
}
