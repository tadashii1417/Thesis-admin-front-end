import React, {Component} from "react";
import LevelQuestionResult from "./LevelQuestionResult/LevelQuestionResult";
import TextQuestionResult from "./TextQuestionResult/TextQuestionResult";
import {Alert, Button, Icon, message} from "antd";
import {exportSurveyResult, getSurveyResult, getSurveyResultTask} from "../../../services/survey_service";
import Loading from "../../Loading/Loading";
import config from "../../../config";
import {TaskStatus} from "../../../constants/task_constant";
import {setIntervalImmediate} from "../../../utils/lang_util";
import {SurveyQuestionType} from "../../../constants/survey_constant";
import {getExportResult} from "../../../services/question_bank_service";
import {forceDownload} from "../../../utils/file_util";

class SurveyResult extends Component {
    state = {
        loading: true,
        data: {},
        status: TaskStatus.CREATED,
        taskId: null,
        exportStatus: null,
        exportTaskId: null
    }

    intervalId = 0;
    exportIntervalId = 0;

    async componentDidMount() {
        try {
            const {data} = await getSurveyResult(this.props.courseId);
            this.setState({loading: false, taskId: data.id});
            this.intervalId = await setIntervalImmediate(this.getSurveyStatistic, config.surveyFetchInterval);
        } catch (e) {
            clearInterval(this.intervalId);
            message.error('Fetch survey statistic failed.');
        }
    }

    getSurveyStatistic = async () => {
        if (!this.state.taskId) return;

        try {
            const {data: report} = await getSurveyResultTask(this.state.taskId);
            switch (report.status) {
                case TaskStatus.CREATED:
                    this.setState({status: TaskStatus.CREATED});
                    break;
                case TaskStatus.FINISHED:
                    this.setState({status: TaskStatus.FINISHED, data: report});
                    clearInterval(this.intervalId);
                    break;
                case TaskStatus.FAILED:
                    this.setState({status: TaskStatus.FAILED});
                    clearInterval(this.intervalId);
                    break;
                default:
                    clearInterval(this.intervalId);
            }
        } catch (e) {
            clearInterval(this.intervalId);
            message.error('Fetch survey statistic failed.');
        }
    }

    handleExportSurvey = async () => {
        try {
            const {data} = await exportSurveyResult(this.props.courseId);
            this.setState({exportTaskId: data.id});
            this.exportIntervalId = await setIntervalImmediate(
                this.fetchExportProcess,
                config.exportSurvey
            )

        } catch (e) {
            message.error("Something went wrong");
        }
    }

    fetchExportProcess = async () => {
        if (!this.state.exportTaskId) return;

        try {
            const {data} = await getExportResult(this.state.exportTaskId);
            switch (data.status) {
                case TaskStatus.CREATED:
                    this.setState({exportStatus: TaskStatus.CREATED});
                    break;
                case TaskStatus.FINISHED:
                    this.setState({exportStatus: TaskStatus.FINISHED});
                    forceDownload(data.result);
                    clearInterval(this.exportIntervalId);
                    break;
                case TaskStatus.FAILED:
                    this.setState({exportStatus: TaskStatus.FAILED});
                    clearInterval(this.exportIntervalId);
                    break;
                default:
                    clearInterval(this.exportIntervalId);
            }
        } catch (e) {
            clearInterval(this.exportIntervalId);
            message.error('Fetch export data failed.');
        }
    }

    render() {
        const {loading, data, status} = this.state;
        if (loading) return <Loading/>;

        if (status === TaskStatus.CREATED) {
            return <Alert
                message="Report are being generate."
                description="Please wait until the process is done."
                type="info"
                icon={<Icon type="loading"/>}
                showIcon
            />;
        }
        if (status === TaskStatus.FAILED) {
            return <Alert
                message="Error"
                description="Something went wrong in server"
                type="error"
                showIcon
            />
        }
        const result = JSON.parse(data.result);
        console.log('result', result);
        if (result.conductorCount === '0') {
            return <Alert
                message="No one finish the survey yet."
                description="Please comeback later"
                type="info"
                showIcon
            />
        }

        return (
            <div>
                <Alert
                    message="Overall Result."
                    style={{marginBottom: '20px'}}
                    description={
                        <div>
                            <div>
                                There is {result.conductorCount} / {result.learnerCount} students finish the survey.
                            </div>
                            <div style={{margin: '15px 0 10px 0'}}>
                                <Button icon={'download'} onClick={this.handleExportSurvey}>
                                    Export Survey
                                </Button>
                            </div>
                        </div>
                    }
                    type="info"
                    showIcon
                />

                {Object.keys(result.questions).map((key, index) => {
                    if ((result.questions[key].answers && Array.isArray(result.questions[key].answers)) || result.questions[key].type === SurveyQuestionType.TEXT) {
                        return <TextQuestionResult index={index + 1} question={result.questions[key]} key={key}/>
                    }
                    if (result.questions[key].type === SurveyQuestionType.LEVEL) {
                        return <LevelQuestionResult index={index + 1} question={result.questions[key]} key={key}/>;
                    }
                    return "";
                })}

            </div>
        );
    }
}

export default SurveyResult;
