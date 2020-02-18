import React, {Component, Suspense} from "react";
import {Alert, Breadcrumb, Button, Divider, message, Modal, Spin, Tabs} from "antd";
import styles from './Quiz.module.css';
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {updateQuizConfig} from "../../../services/quiz_service";
import QuizSetting from "./QuizSetting";
import {QuizDto} from "../../../dtos/quiz_dto";
import Loading from "../../Loading/Loading";

const QuizQuestions = React.lazy(() => import('./QuizQuestions'));

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
                // TODO: more specific cases
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    handleCancel = () => {
        this.setState({openModal: false});
    };

    handleOK = () => {
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
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    render() {
        const {module, loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        const {match, location} = this.props;
        const {instanceData} = module;
        const quizSettingDto = QuizDto.toQuizSettingDto(instanceData);
        const query = new URLSearchParams(location.search);


        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {query.get('course')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[1].icon}
                            style={{color: ModulesConfig[1].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>
                <div className="adminContent">
                    <Tabs type={"card"}>
                        <TabPane key={"setting"} tab={<span>Settings</span>}>
                            <div className={styles.quizContainer}>
                                {module.visibility === "private" ?
                                    <Alert
                                        message={"This module is unpublished"}
                                        type="info"
                                        style={{margin: '10px 0 20px 0'}}
                                        showIcon
                                        closable
                                    /> : ""
                                }
                                <h4>Description</h4>
                                <Divider className={styles.divider}/>
                                <div>
                                    {quizSettingDto.description}
                                </div>
                                <br/><br/>
                                <h4>Quiz Information</h4>
                                <Divider className={styles.divider}/>
                                <div className={styles.quizInfo}>
                                    <div className={styles.fields}>
                                        <div>Grading policy</div>
                                        <div>Pass threshold</div>
                                        <div>Shuffle answer</div>
                                        <div>Duration</div>
                                        <div>Open day</div>
                                        <div>Close day</div>
                                        <div>Maximum attempt allowed</div>
                                    </div>
                                    <div className={styles.values}>
                                        <div>{quizSettingDto.gradingPolicy}</div>
                                        <div>{quizSettingDto.passThreshold}</div>
                                        <div>{quizSettingDto.shuffleAnswer}</div>
                                        <div>{quizSettingDto.duration} minutes</div>
                                        <div>{quizSettingDto.openAt}</div>
                                        <div>{quizSettingDto.closeAt}</div>
                                        <div>{quizSettingDto.numAttempt}</div>
                                    </div>
                                </div>

                                <div className={styles.settingButton}>
                                    <Button type={"primary"}
                                            icon={"setting"}
                                            onClick={this.handleOK}>
                                        Edit setting
                                    </Button>
                                </div>
                            </div>
                        </TabPane>

                        <TabPane key={"questions"} tab={<span> Questions</span>}>
                            <Suspense fallback={<Loading/>}>
                                <QuizQuestions moduleId={module.id}/>
                            </Suspense>
                        </TabPane>
                    </Tabs>
                </div>

                <Modal title={"Edit Quiz Setting"}
                       visible={this.state.openModal}
                       onCancel={this.handleCancel}
                       bodyStyle={{padding: "12px 24px"}}
                       footer={null}>
                    <QuizSetting handleUpdateQuiz={this.handleUpdateQuizConfig} data={instanceData}/>
                </Modal>
            </>
        );
    }
}

