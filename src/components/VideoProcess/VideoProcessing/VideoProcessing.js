import React, {Component} from "react";
import {Button, Icon, message, Steps, Tooltip} from "antd";
import styles from './VideoProcessing.module.css';
import {deleteProcess, getProgress, terminateProcess} from "../../../services/video_service";
import {VideoStatusType} from "../../../constants/video_contant";

const {Step} = Steps;

class VideoProcessing extends Component {
    state = {
        current: 0,
        loading: true,
        showDelete: false,
        processId: '',
        finalStatus: VideoStatusType.FINISHED,
        processStatus: 'process'
    };

    intervalId = 0;

    async componentDidMount() {
        this.props.setProgressing(true);
        await this.fetchProgress();
        this.intervalId = setInterval(this.fetchProgress, 1000);
    }

    messageMapping = {
        [VideoStatusType.FINISHED]: {
            description: "Video process successfully",
            title: 'Finished'
        },
        [VideoStatusType.TERMINATED]: {
            description: 'Video has been terminated',
            title: 'Terminated'
        },
        [VideoStatusType.FAILED]: {
            description: 'Video process failed. Please try again',
            title: 'Failed'
        }
    };

    terminateProcess = async () => {
        try {
            await terminateProcess(this.state.processId);
            message.info("Upload has been terminated.");
        } catch (e) {
            message.error("Fail to terminate process")
        }
    };

    deleteProcess = async () => {
        try {
            await deleteProcess(this.state.processId);
            const {finalStatus} = this.state;
            if (finalStatus === VideoStatusType.TERMINATED || finalStatus === VideoStatusType.FAILED) {
                this.props.setCurrent(0);
                this.props.setStepStatus('process');
            }
            message.success("Process has been deleted.");
        } catch (e) {
            message.error("Fail to terminate process")
        }
    };

    fetchProgress = async () => {
        try {
            const {moduleId, setStepStatus, setProgressing} = this.props;
            const {data: {statuses, id}} = await getProgress(moduleId);
            this.setState({processId: id});
            const status = statuses[statuses.length - 1];

            switch (status.type) {
                case VideoStatusType.UPLOADED:
                    break;

                case VideoStatusType.STREAMIZING:
                    this.setState({current: 1});
                    break;

                case VideoStatusType.SAVING:
                    this.setState({current: 2});
                    break;

                case VideoStatusType.SETTING:
                    this.setState({current: 3});
                    break;

                case VideoStatusType.FINISHED:
                    clearInterval(this.intervalId);
                    this.setState({current: 4, finalStatus: VideoStatusType.FINISHED});
                    setProgressing(false);
                    setStepStatus('finish');
                    this.setState({showDelete: true, processStatus: 'finish'});
                    break;

                case VideoStatusType.FAILED:
                    clearInterval(this.intervalId);
                    this.setState({current: 4, finalStatus: VideoStatusType.FAILED});
                    setProgressing(false);
                    setStepStatus('error');
                    this.setState({showDelete: true, processStatus: 'error'});
                    break;

                case VideoStatusType.TERMINATED:
                    clearInterval(this.intervalId);
                    this.setState({current: 4, finalStatus: VideoStatusType.TERMINATED});
                    setStepStatus('error');
                    setProgressing(false);
                    this.setState({showDelete: true, processStatus: 'error'});
                    break;

                default:
                    break;
            }
        } catch (e) {
            clearInterval(this.intervalId);
            message.error("Something went wrong when fetching progress");
        }
    };

    render() {
        const {setCurrent} = this.props;
        const {current, finalStatus, showDelete, processStatus} = this.state;

        return <div className={styles.stepsContent}>
            <h3>
                <Icon type="double-right" className={styles.icon}/>
                Video is being processed
            </h3>

            <div className={styles.stepsContainer}>
                <div>
                    <Steps progressDot current={current} status={processStatus}>

                        <Step description="Video file has been uploaded"
                            title={<span><Icon type={"forward"} className={styles.progressIcon}/>Uploaded</span>}/>

                        <Step description="Create small files"
                              title={<span><Icon type={"scissor"} className={styles.progressIcon}/>Streamizing</span>}/>

                        <Step description="Upload file pieces to video server"
                            title={<span><Icon type={"vertical-align-bottom"}
                                               className={styles.progressIcon}/>Saving</span>}/>

                        <Step description="Generate video URL"
                            title={<span><Icon type={"experiment"} className={styles.progressIcon}/>Setting</span>}/>

                        <Step description={this.messageMapping[finalStatus].description}
                            title={<span>
                                <Icon type={"alert"}
                                      className={styles.progressIcon}/>{this.messageMapping[finalStatus].title}</span>}/>

                    </Steps>
                </div>
            </div>

            <div className={styles.actions}>

                {current < 4 &&
                <Tooltip title={"This action will terminate video process and revert all previous actions."}>
                    <Button type={"danger"} onClick={this.terminateProcess}>Terminate</Button>
                </Tooltip>
                }

                {showDelete &&
                <Tooltip title={"Clear previous process and only show video next time."}>
                    <Button onClick={this.deleteProcess} type={"danger"} className={styles.clearBtn}><Icon
                        type={"delete"}/> Clear</Button>
                </Tooltip>
                }

                {current === 4 && finalStatus === VideoStatusType.FINISHED &&
                <Tooltip title={"Preview your video."}>
                    <Button type="primary" onClick={() => setCurrent(2)}>Finish</Button>
                </Tooltip>
                }

            </div>
        </div>
    }
}

export default VideoProcessing;