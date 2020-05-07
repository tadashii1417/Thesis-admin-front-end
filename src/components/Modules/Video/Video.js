import React, {Component} from "react";
import {message, Spin, Steps} from "antd";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import SelectType from "../../VideoProcess/SelectType/SelectType";
import VideoProcessing from "../../VideoProcess/VideoProcessing/VideoProcessing";
import VideoFinished from "../../VideoProcess/VideoFinished/VideoFinished";
import {getProgress} from "../../../services/video_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

const {Step} = Steps;

class Video extends Component {
    state = {
        loading: true,
        module: {},
        current: 0,
        stepStatus: 'process',
        progressing: false
    };

    async componentDidMount() {
        const {params: {moduleId}} = this.props.match;

        try {
            const {data} = await getModule(moduleId);
            let current = this.state.current;
            if (data.instanceData) current = 2;
            this.setState({module: data, loading: false, current: current});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }

        try {
            await getProgress(moduleId);
            this.setState({current: 1});
        } catch (e) {
            console.log('No process');
        }
    }

    setStepStatus = (val) => {
        this.setState({stepStatus: val})
    };

    setProgressing = (val) => {
        this.setState({progressing: val});
    };

    setCurrent = (val) => {
        if (val >= 3) return;
        this.setState({current: val});
    };

    render() {
        const {module, loading, current} = this.state;
        if (loading) return <Spin/>;

        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        const steps = [
            <SelectType moduleId={this.state.module.id} setCurrent={this.setCurrent}/>,
            <VideoProcessing
                moduleId={this.state.module.id}
                setStepStatus={this.setStepStatus}
                setCurrent={this.setCurrent}
                setProgressing={this.setProgressing}/>,
            <VideoFinished moduleId={this.state.module.id}/>
        ];

        return (
            <ModuleLayout moduleType={ModuleType.VIDEO} slug={slug} courseName={courseName} module={module}>

                <Steps current={current} status={this.state.stepStatus}>
                    <Step key={"step-1"} title={"Select Type"} description={"Where is your video ?"}/>
                    <Step key={"step-2"} title={"Video Processing"} description={"Please wait ..."}
                          subTitle={this.state.progressing ? <Spin/> : ''}/>
                    <Step key={"step-3"} title={"Finished"} description={"Preview video"}/>
                </Steps>

                <div>{steps[current]}</div>

            </ModuleLayout>
        );
    }
}

export default Video;
