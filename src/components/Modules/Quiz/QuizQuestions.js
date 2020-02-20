import React, {Component} from "react";
import {Button, Divider, Collapse, Icon, Result, Spin, message, Modal} from "antd";
import styles from './Quiz.module.css';
import QuestionEdit from "./Question/QuestionDetail";
import {httpErrorHandler} from "../../../utils/axios_util";
import {
    deleteQuizQuestion,
    fetchQuizQuestions,
    insertQuizQuestionByHand,
    updateQuizQuestion
} from "../../../services/quiz_service";
import NewQuestionForm from "./Question/NewQuestionForm";
import QuestionEditForm from "./Question/QuestionEditForm";
import {ServerErrors} from "../../../constants/server_error_constant";

const {Panel} = Collapse;
const {confirm} = Modal;

export default class extends Component {
    state = {
        questions: [],
        loading: true,
        addModal: false,
        editModal: false,
        selectedQuestion: null
    };

    async componentDidMount() {
        try {
            const {data} = await fetchQuizQuestions(this.props.moduleId);
            const {questions} = data;
            this.setState({questions: questions, loading: false})
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
                <Button onClick={(e) => this.showDeleteConfirm(question.id, e) }>
                    <Icon type={"delete"} theme={"twoTone"} twoToneColor={"#eb2f96"}/>
                </Button>
            </React.Fragment>
        );
    };

    handleCancelAddModal = () => {
        this.setState({addModal: false})
    };

    handleAddModal = () => {
        this.setState({addModal: true})
    };

    handleCancelEdit = () => {
        this.setState({editModal: false})
    };

    handleEditModal = (question, e) => {
        e.stopPropagation();
        this.setState({editModal: true, selectedQuestion: question})
    };

    addQuestionHandler = async (values, action) => {
        try {
            const {data} = await insertQuizQuestionByHand(this.props.moduleId, values);
            message.success("New question has been inserted.");
            let newList = [...this.state.questions];
            newList.push(data);
            this.setState({questions: newList, addModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case (ServerErrors.INVALID_FRACTION_SINGLE_ANSWER):
                        message.error("Single choice must have one option with fraction 1 and others 0");
                        break;
                    case (ServerErrors.INVALID_FRACTION_SUM):
                        message.error("Sum of all options fraction must be 1");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    editQuestionHandler = async (id, values) => {
        try{
            const {data} = await updateQuizQuestion(id, values);
            message.success("Question has been updated.");
            const updatedQuestions = [...this.state.questions];
            let index = updatedQuestions.findIndex(obj => obj.id === id);
            updatedQuestions[index] = data;
            this.setState({questions: updatedQuestions, editModal: false});
        }catch (e) {
            httpErrorHandler(e, ()=>{
                switch (e.code) {
                    case (ServerErrors.INVALID_FRACTION_SINGLE_ANSWER):
                        message.error("Single choice must have one option with fraction 1 and others 0");
                        break;
                    case (ServerErrors.INVALID_FRACTION_SUM):
                        message.error("Sum of all options fraction must be 1");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    showDeleteConfirm= (id, e) => {
        e.stopPropagation();
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.deleteQuestionHandler(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    deleteQuestionHandler = async (id) => {
        try{
            await deleteQuizQuestion(id);
            message.success("Question has been deleted");
            let updatedQuestions = [...this.state.questions];
            updatedQuestions = updatedQuestions.filter(question => question.id !== id);
            this.setState({questions: updatedQuestions});
        }catch (e) {
            httpErrorHandler(e, ()=> {
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
                        <Button onClick={this.handleAddModal}>Add</Button>
                        <Divider type={"vertical"}/>
                        <Button type={"primary"}>Save</Button>
                    </div>

                    <Modal title={"Add new question"}
                           visible={this.state.addModal}
                           onCancel={this.handleCancelAddModal}
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
                        <QuestionEditForm data={this.state.selectedQuestion} editQuestionHandler={this.editQuestionHandler}/>
                    </Modal>
                </div>
            </div>

        );
    }
}
