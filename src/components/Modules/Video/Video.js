import React, {Component} from "react";
import {Breadcrumb, message, Spin, Steps, Button} from "antd";
import styles from "./Video.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import SelectType from "../../VideoProcess/SelectType/SelectType";
import VideoInput from "../../VideoProcess/VideoInput/VideoInput";
import VideoProcessing from "../../VideoProcess/VideoProcessing/VideoProcessing";
import VideoFinished from "../../VideoProcess/VideoFinished/VideoFinished";

const {Step} = Steps;

class Article extends Component {
    state = {
        loading: true,
        module: {},
        current: 0
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
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

    steps = [
        <SelectType/>,
        <VideoInput/>,
        <VideoProcessing/>,
        <VideoFinished/>
    ];

    next = () => {
        if (this.state.current === 3) {
            return;
        }
        const current = this.state.current + 1;
        this.setState({current});
    };

    prev = () => {
        if (this.state.current === 0) {
            return;
        }
        const current = this.state.current - 1;
        this.setState({current});
    };

    render() {
        const {module, loading, current} = this.state;
        if (loading) {
            return <Spin/>
        }
        const {match, location} = this.props;
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
                            icon={ModulesConfig[ModuleType.VIDEO].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.VIDEO].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>

                <div className="adminContent">
                    <Steps current={current}>
                        <Step key={"step-1"} title={"Select Type"}/>
                        <Step key={"step-2"} title={"Inputs"} description={"Fill in the content"}/>
                        <Step key={"step-3"} title={"VideoProcessing"} description={"Please wait"}/>
                        <Step key={"step-4"} title={"Finished"} description={"View video"}/>
                    </Steps>

                    <div className={styles.stepsContent}>{this.steps[current]}</div>

                    <div className={styles.stepsAction}>

                        {current < this.steps.length - 1 && (
                            <Button type="primary" onClick={this.next}>
                                Next
                            </Button>
                        )}

                        {current === this.steps.length - 1 && (
                            <Button type="primary">
                                Done
                            </Button>
                        )}

                        {current > 0 && (
                            <Button style={{margin: 8}} onClick={this.prev}>
                                Previous
                            </Button>
                        )}
                    </div>
                </div>

            </>
        );
    }
}

export default Article;
