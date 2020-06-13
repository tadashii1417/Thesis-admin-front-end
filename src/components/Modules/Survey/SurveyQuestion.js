import React, {Component} from "react";
import {Button, Icon, message, Modal, Result, Tabs} from "antd";
import styles from "./Survey.module.css";
import {ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";
import {
    createSurveyQuestions,
    deleteSurveyQuestion,
    getSurveyQuestions,
    updateSurveyQuestion
} from "../../../services/survey_service";
import {SurveyQuestionType, TextLevelMapping} from "../../../constants/survey_constant";
import SurveyLevelQuestion from "../../SurveyLevelQuestion/SurveyLevelQuestion";
import SurveyTextQuestion from "../../SurveyTextQuestion/SurveyTextQuestion";
import NewSurveyQuestion from "./NewSurveyQuestionForm";
import EditSurveyQuestion from "./EditSurveyQuestionForm";
import Loading from "../../Loading/Loading";
import SurveyResult from "./SurveyResult";

const {confirm} = Modal;

class SurveyQuestion extends Component {
    state = {
        loading: true,
        newQuestion: false,
        editQuestion: false,
        module: {},
        questions: [],
        selectedQuestion: null
    };

    setSelectedQuestion = (question) => {
        this.setState({selectedQuestion: question});
    }

    openNewQuestionModal = () => {
        this.setState({newQuestion: true})
    };

    closeNewQuestionModal = () => {
        this.setState({newQuestion: false})
    };

    openEditQuestionModal = () => {
        this.setState({editQuestion: true})
    };

    closeEditQuestionModal = () => {
        this.setState({editQuestion: false})
    };

    handleEditModule = async (patch) => {
        const {module} = this.state;
        let key = "update-module";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateModule(module.id, patch);
            data.instanceData = module.instanceData;
            this.setState({module: data});
            message.success({content: "Module has been updated", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error({content: "Something went wrong", key});
            })
        }
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data: module} = await getModule(params.moduleId);
            const {data: questions} = await getSurveyQuestions();
            this.setState({module: module, questions: questions, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error("Something went wrong");
            });
        }
    }

    handleNewQuestion = async (values) => {
        try {
            const {data} = await createSurveyQuestions(values);
            const updatedQuestions = [...this.state.questions];
            if (values.type === SurveyQuestionType.TEXT) {
                updatedQuestions.push(data);
            } else {
                const firstTextIndex = updatedQuestions.findIndex(t => t.type === SurveyQuestionType.TEXT);
                updatedQuestions.splice(firstTextIndex, 0, data);
            }
            message.success("New question has been added !");
            this.setState({questions: updatedQuestions, newQuestion: false});
        } catch (e) {
            message.error("Something went wrong !");
        }
    }

    handleDeleteQuestion = async (id) => {
        try {
            await deleteSurveyQuestion(id);
            let updatedQuestions = [...this.state.questions];
            updatedQuestions = updatedQuestions.filter(q => q.id !== id);
            this.setState({questions: updatedQuestions});
            message.success("Question has been deleted");
        } catch (e) {
            message.error("Somthing went wrong !");
        }
    }

    showDeleteConfirm = (id) => {
        confirm({
            title: `Are you sure to delete this file ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.handleDeleteQuestion(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    handleEditQuestion = async (id, patch) => {
        try {
            await updateSurveyQuestion(id, patch);
            message.success("Question has been updated");
            let updatedQuestions = [...this.state.questions];
            const index = updatedQuestions.findIndex(q => q.id === id);
            updatedQuestions[index].content = patch[0].value;
            this.setState({questions: updatedQuestions});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    renderLevelQuestionHeader = () => (
        <div className={styles.surveyHeader}>
            {TextLevelMapping.map(level => (
                <div className={styles.surveyLevel} key={level}>
                    {level}
                </div>
            ))}
        </div>
    );

    render() {
        const {module, loading, questions} = this.state;
        if (loading) return <Loading/>;
        console.log(this.props.location.state);
        const {match: {params: {slug}}, location: {state: {courseName, courseId}}} = this.props;

        return (
            <ModuleLayout
                slug={slug}
                courseName={courseName}
                moduleType={ModuleType.ARTICLE}
                handleEditModule={this.handleEditModule}
                module={module}>
                <Tabs type="card">
                    <Tabs.TabPane key="questions" tab={<span><Icon type="question-circle"/>Manage questions</span>}>
                        {questions.length === 0 &&
                        <Result
                            status="404"
                            title="404"
                            subTitle="This is no survey questions"/>
                        }

                        {questions.length > 0 && questions[0].type === "level" && this.renderLevelQuestionHeader()}
                        {questions.map((question, i) => (
                            (question.type === SurveyQuestionType.LEVEL)
                                ? <SurveyLevelQuestion question={question} index={i} key={question.id}
                                                       setSelectedQuestion={this.setSelectedQuestion}
                                                       openEditModal={this.openEditQuestionModal}
                                                       handleDelete={this.showDeleteConfirm}/>
                                : <SurveyTextQuestion question={question} index={i} key={question.id}
                                                      setSelectedQuestion={this.setSelectedQuestion}
                                                      openEditModal={this.openEditQuestionModal}
                                                      handleDelete={this.showDeleteConfirm}/>
                        ))}

                        <div className={styles.addQuestion}>
                            <Button type={"primary"} onClick={this.openNewQuestionModal}>Add question</Button>
                        </div>

                    </Tabs.TabPane>
                    <Tabs.TabPane key="result" tab={<span> <Icon type="bar-chart"/>Survey result</span>}>
                        <SurveyResult courseId={courseId}/>
                    </Tabs.TabPane>
                </Tabs>

                <Modal title={"New survey question"}
                       visible={this.state.newQuestion}
                       onCancel={this.closeNewQuestionModal}
                       footer={null}>
                    <NewSurveyQuestion handleNewQuestion={this.handleNewQuestion}/>
                </Modal>

                <Modal title={"Edit survey question"}
                       visible={this.state.editQuestion}
                       onCancel={this.closeEditQuestionModal}
                       footer={null}>
                    <EditSurveyQuestion question={this.state.selectedQuestion}
                                        closeEditQuestion={this.closeEditQuestionModal}
                                        handleEditQuestion={this.handleEditQuestion}/>
                </Modal>

            </ModuleLayout>
        );
    }
}

export default SurveyQuestion;
