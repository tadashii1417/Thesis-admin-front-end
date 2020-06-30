import React, {Component, Suspense} from "react";
import {Button, Divider, Collapse, Icon, Result, message, Modal} from "antd";
import styles from './Quiz.module.css';
import {httpErrorHandler} from "../../../utils/axios_util";
import {
    deleteQuizQuestion,
    fetchQuizQuestions,
    insertQuizQuestionByHand, insertQuizQuestionFromBank,
    updateQuizQuestion
} from "../../../services/quiz_service";
import {ServerErrors} from "../../../constants/server_error_constant";
import Loading from "../../Loading/Loading";

const {Panel} = Collapse;
const {confirm} = Modal;

const QuestionDetail = React.lazy(() => import("./Question/QuestionDetail"));
const NewQuestionForm = React.lazy(() => import("./Question/NewQuestionForm"));
const BankQuestions = React.lazy(() => import("../../BankQuestions/BankQuestion"));

export default class extends Component {
    state = {
        questions: [],
        loading: true,
        addModal: false,
        addFromBank: false,
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
        return (<Button onClick={(e) => this.showDeleteConfirm(question.id, e)}>
                <Icon type={"delete"} theme={"twoTone"} twoToneColor={"#eb2f96"}/>
            </Button>
        );
    };

    handleCancelAddModal = () => {
        this.setState({addModal: false})
    };

    handleAddModal = () => {
        this.setState({addModal: true})
    };

    addQuestionHandler = async (values, action) => {
        let key = "add-question";

        try {
            message.loading({content: "Loading", key});
            const {data} = await insertQuizQuestionByHand(this.props.moduleId, values);
            message.success({content: "New question has been inserted.", key});
            let newList = [...this.state.questions];
            newList.push(data);
            this.setState({questions: newList, addModal: false});
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

    editQuestionHandler = async (id, values) => {
        const key = "edit-question";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateQuizQuestion(id, values);
            message.success({content: "Question has been updated.", key});
            const updatedQuestions = [...this.state.questions];
            let index = updatedQuestions.findIndex(obj => obj.id === id);
            updatedQuestions[index] = data;
            this.setState({questions: updatedQuestions});
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

    showDeleteConfirm = (id, e) => {
        e.stopPropagation();
        confirm({
            title: 'Are you sure delete this question?',
            content: "This action can't be reverted.",
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
        try {
            await deleteQuizQuestion(id);
            message.success("Question has been deleted");
            let updatedQuestions = [...this.state.questions];
            updatedQuestions = updatedQuestions.filter(question => question.id !== id);
            this.setState({questions: updatedQuestions});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    handleAddQuestionFromBank = async () => {
        const {selectedQuestion} = this.state;
        if (!selectedQuestion) {
            message.error("Please select one question");
        } else {
            try {
                await insertQuizQuestionFromBank(this.props.moduleId, selectedQuestion.id);
                const updatedQuestions = [...this.state.questions];
                updatedQuestions.push(selectedQuestion);
                this.setState({questions: updatedQuestions, addFromBank: false})
                message.success("Question has been added");
            } catch (e) {
                message.error("Something went wrong");
            }
        }
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectedQuestion: selectedRows[0]});
        },
        type: "radio"
    }

    render() {
        const {loading} = this.state;
        if (loading) return <Loading/>;

        return (
            <div className={styles.quizContainer}>

                <h4>Question list</h4>
                <Divider className={styles.divider}/>

                {this.state.questions.length ?
                    <Collapse accordion>
                        {this.state.questions.map((item, index) => (
                            <Panel key={item.id}
                                   header={<span> Question {index + 1}</span>}
                                   extra={this.genExtra(item)}>
                                <Suspense fallback={<Loading/>}>
                                    <QuestionDetail question={item} editQuestionHandler={this.editQuestionHandler}/>
                                </Suspense>
                            </Panel>
                        ))}
                    </Collapse> :
                    <Result status="404" subTitle="There is no question yet, please add more !"/>
                }

                <div className={styles.actionArea}>
                    <Button onClick={this.handleAddModal} type={"primary"}>Add question</Button>
                    <Divider type={"vertical"}/>
                    <Button onClick={() => this.setState({addFromBank: true})}>
                        Import from bank
                    </Button>
                </div>

                <Modal title={"Add new question"}
                       visible={this.state.addModal}
                       onCancel={this.handleCancelAddModal}
                       bodyStyle={{padding: "12px 20px"}}
                       style={{top: 20}}
                       width={'60%'}
                       footer={null}>
                    <Suspense fallback={null}>
                        <NewQuestionForm addQuestionHandler={this.addQuestionHandler}/>
                    </Suspense>
                </Modal>

                <Modal title={"Insert question from bank"}
                       visible={this.state.addFromBank}
                       onCancel={() => this.setState({addFromBank: false})}
                       bodyStyle={{padding: "12px 20px"}}
                       style={{top: 20}}
                       onOk={this.handleAddQuestionFromBank}
                       width={'60%'}>

                    <Suspense fallback={Loading()}>
                        <BankQuestions
                            isBeingImport={true}
                            rowSelection={this.rowSelection}/>
                    </Suspense>
                </Modal>

            </div>

        );
    }
}
