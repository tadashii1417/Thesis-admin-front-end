import React, {Component} from "react";
import {Alert, Breadcrumb, Button, Divider, message, Modal, Spin, Tabs} from "antd";
import styles from './Quiz.module.css';
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import QuizEdit from "./QuizEdit";
import {createNewModule, getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import ModuleType from "../../../constants/module_constant";
import {createNewQuiz} from "../../../services/quiz_service";
import QuizSetting from "./QuizSetting";

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
            console.log(data)
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

    handleCancel = () => {
        this.setState({openModal: false});
    };

    handleOK = () => {
        this.setState({openModal: true})
    };

    handleNewModule = async (values) => {
        try {
            const {id} = this.props.value;
            const {modules} = this.props.value;

            const {data} = await createNewModule(values, modules, id);
            if (data.type === ModuleType.QUIZ) {
                const {quiz} = await createNewQuiz(data.id);
            }

            this.props.value.modules.push(data);

            message.success("New module has been created");
            this.setState({isAddModule: false});
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
        if (this.state.loading) {
            return <Spin/>
        }

        const {match, location} = this.props;
        const {module} = this.state;
        const {instanceData} = module;
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
                                <div className={styles.introduction}>
                                    {instanceData.description}
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
                                        <div>{instanceData.gradingPolicy}</div>
                                        <div>{instanceData.passThreshold}</div>
                                        <div>{instanceData.shuffleAnswer ? "False" : "True"}</div>
                                        <div>{instanceData.duration + " "} minutes</div>
                                        <div>{instanceData.openAt + " "}</div>
                                        <div>{instanceData.closeAt + " "}</div>
                                        <div>{instanceData.numAttempt + " "}</div>
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
                        <TabPane key={"questions"} tab={<span>Questions</span>}>
                            <QuizEdit/>
                        </TabPane>
                    </Tabs>
                </div>

                <Modal title={"Edit Quiz Setting"}
                       visible={this.state.openModal}
                       onCancel={this.handleCancel}
                       bodyStyle={{padding: "12px 24px"}}
                       footer={null}>
                    <QuizSetting handleEditSetting={this.handleNewModule}/>
                </Modal>
            </>
        );
    }
}

