import React, {Component} from "react";
import {Button, Icon, message, Steps, Tooltip} from "antd";
import styles from './VideoProcessing.module.css';
import {getProgress} from "../../../services/video_service";
import {VideoStatusType} from "../../../constants/video_contant";

const {Step} = Steps;

class VideoProcessing extends Component {
    state = {
        current: 0,
        loading: true,
        lastStatus: ''
    };

    intervalId = 0;

    async componentDidMount() {
        this.props.setProgressing(true);
        await this.fetchProgress();
        this.intervalId = setInterval(this.fetchProgress, 4000);
    }

    fetchProgress = async () => {
        try {
            const {moduleId, setStepStatus, setProgressing} = this.props;
            const {data: {statuses}} = await getProgress(moduleId);
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
                    this.setState({current: 4, lastStatus: VideoStatusType.FINISHED});
                    setProgressing(false);
                    clearInterval(this.intervalId);
                    setStepStatus('finish');
                    break;
                case VideoStatusType.FAILED:
                    this.setState({current: 4, lastStatus: VideoStatusType.FAILED});
                    setProgressing(false);
                    setStepStatus('error');
                    clearInterval(this.intervalId);
                    break;
                case VideoStatusType.TERMINATED:
                    this.setState({current: 4, lastStatus: VideoStatusType.TERMINATED});
                    setProgressing(false);
                    clearInterval(this.intervalId);
                    break;
                default:
                    break;
            }
        } catch (e) {
            message.error("Something went wrong when fetching progress");
        }
    };

    render() {
        const {setCurrent} = this.props;

        return <div className={styles.stepsContent}>
            <h3>
                <Icon type="double-right" className={styles.icon}/>
                Video is being processed
            </h3>

            <div className={styles.stepsContainer}>
                <div>
                    <Steps progressDot current={this.state.current} status={"process"}>

                        <Step
                            description="Video file has been uploaded"
                            title={<span><Icon type={"forward"} className={styles.progressIcon}/>Uploaded</span>}/>

                        <Step description="Create small files"
                              title={<span><Icon type={"scissor"} className={styles.progressIcon}/>Streamizing</span>}/>

                        <Step
                            description="Upload file pieces to video server"
                            title={<span><Icon type={"vertical-align-bottom"} className={styles.progressIcon}/>Saving
                    </span>}/>

                        <Step
                            description="Generate video URL"
                            title={<span><Icon type={"experiment"} className={styles.progressIcon}/>Setting
                    </span>}/>

                        <Step
                            description="Video process successfully"
                            title={<span><Icon type={"alert"} className={styles.progressIcon}/>Finished
                    </span>}/>

                    </Steps>
                </div>
            </div>

            <div className={styles.actions}>
                {this.state.current < 4 &&
                <Tooltip title={"This action will terminate video process and revert all previous actions."}>
                    <Button type={"danger"}>Terminate</Button>
                </Tooltip>
                }

                {this.state.current === 4 && this.state.lastStatus === VideoStatusType.FINISHED &&
                <Tooltip title={"Preview your video."}>
                    <Button type="primary" onClick={() => setCurrent(2)}>Finish</Button>
                </Tooltip>
                }
            </div>

        </div>

    }
}

export default VideoProcessing;