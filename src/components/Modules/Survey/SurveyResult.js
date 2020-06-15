import React, {Component} from "react";
import LevelQuestionResult from "./LevelQuestionResult/LevelQuestionResult";
import TextQuestionResult from "./TextQuestionResult/TextQuestionResult";
import {Alert, Icon, message} from "antd";
import {getSurveyResult, getSurveyResultTask} from "../../../services/survey_service";
import Loading from "../../Loading/Loading";
import config from "../../../config";
import {TaskStatus} from "../../../constants/task_constant";
import {setIntervalImmediate} from "../../../utils/lang_util";
import {SurveyQuestionType} from "../../../constants/survey_constant";

class SurveyResult extends Component {
    state = {
        status: TaskStatus.CREATED,
        loading: true,
        taskId: null,
        data: {}
    }

    intervalId = 0;

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
            console.log(report);
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
                    description={'There is ' + result.conductorCount + ' / ' + result.learnerCount + ' students finish the survey'}
                    type="info"
                    showIcon
                />

                {Object.keys(result.questions).map((key, index) => {
                    if (result.questions[key].type === SurveyQuestionType.LEVEL) {
                        return <LevelQuestionResult index={index + 1} question={result.questions[key]} key={key}/>;
                    }
                    if (result.questions[key].type === SurveyQuestionType.TEXT) {
                        return <TextQuestionResult index={index + 1} question={result.questions[key]} key={key}/>
                    }
                    return "";
                })}

            </div>
        );
    }
}

export default SurveyResult;
