import React, {Component, Suspense} from "react";
import {message, Modal, Spin, Tabs} from "antd";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {updateQuizConfig} from "../../../services/quiz_service";
import {QuizDto} from "../../../dtos/quiz_dto";
import Loading from "../../Loading/Loading";
import {ModuleType} from "../../../constants/module_constant";
import {ServerErrors} from "../../../constants/server_error_constant";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

const QuizSetting = React.lazy(() => import("./QuizSetting"));
const QuizQuestions = React.lazy(() => import('./QuizQuestions'));
const QuizResult = React.lazy(() => import('./QuizResult'));
const QuizSettingForm = React.lazy(() => import("./QuizSettingForm"));

const {TabPane} = Tabs;

export default class extends Component {
    state = {
        module: {},
        loading: true,
        openModal: false
    };

    async componentDidMount() {
        try {
            const {data} = await getModule(this.props.match.params.moduleId);
            this.setState({module: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

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

    closeSettingModal = () => {
        this.setState({openModal: false});
    };

    openSettingModal = () => {
        this.setState({openModal: true})
    };

    handleUpdateQuizConfig = async (patch) => {
        try {
            const {module} = this.state;
            const {data} = await updateQuizConfig(module.id, patch);
            message.success("Quiz setting has been updated");
            this.setState({
                module: {...this.state.module, instanceData: data},
                openModal: false
            });
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.INVALID_TIME_CONFIG:
                        message.error('Close time must be larger than open time !');
                        break;
                    case ServerErrors.TIME_RANGE_SMALLER_THAN_DURATION:
                        message.error('Not enough for duration in this time range !');
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    render() {
        const {module, loading} = this.state;
        if (loading) return <Spin/>;

        const {match: {params: {slug}}, location: {state}} = this.props;
        const courseName = state ? state.courseName : "Course name";
        const {instanceData} = module;
        const quizSettingDto = QuizDto.toQuizSettingDto(instanceData);

        return (
            <ModuleLayout slug={slug}
                          moduleType={ModuleType.QUIZ}
                          courseName={courseName}
                          handleEditModule={this.handleEditModule}
                          module={module}>
                <Tabs type={"card"}>
                    <TabPane key={"setting"} tab={<span>Settings</span>}>
                        <Suspense fallback={<Loading/>}>
                            <QuizSetting quizSettingDto={quizSettingDto} openSettingModal={this.openSettingModal}/>
                        </Suspense>
                    </TabPane>

                    <TabPane key={"questions"} tab={<span> Questions</span>}>
                        <Suspense fallback={null}>
                            <QuizQuestions moduleId={module.id}/>
                        </Suspense>
                    </TabPane>

                    <TabPane key={"attempts"} tab={<span> Results</span>}>
                        <Suspense fallback={null}>
                            <QuizResult moduleId={module.id}/>
                        </Suspense>
                    </TabPane>
                </Tabs>

                <Modal title={"Edit Quiz Setting"}
                       visible={this.state.openModal}
                       onCancel={this.closeSettingModal}
                       bodyStyle={{padding: "12px 24px"}}
                       footer={null}>
                    <Suspense fallback={null}>
                        <QuizSettingForm handleUpdateQuiz={this.handleUpdateQuizConfig} data={instanceData}/>
                    </Suspense>
                </Modal>
            </ModuleLayout>
        );
    }
}

