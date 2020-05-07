import React, {Component} from "react";
import {Breadcrumb, Button, message, Spin} from "antd";
import styles from "./Livestream.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {LivestreamStatus, ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {
    endLivestream,
    getLivestreamPlayback,
    joinLivestream,
    startLivestream
} from "../../../services/livestream_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

class Livestream extends Component {
    state = {
        loading: true,
        module: {},
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

    startLivestream = async () => {
        try {
            const {module} = this.state;
            await startLivestream(module.id);

            let updatedModule = {...module};
            updatedModule.instanceData = {...module.instanceData, status: LivestreamStatus.RUNNING}
            this.setState({module: updatedModule});
            message.success("Livestream has been started.");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    endLivestream = async () => {
        try {
            const {module} = this.state;
            await endLivestream(module.id);

            let updatedModule = {...module};
            updatedModule.instanceData = {...module.instanceData, status: LivestreamStatus.ENDED}
            this.setState({module: updatedModule});
            message.success("Livestream has been ended.");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    joinLivestream = async () => {
        try {
            const {module} = this.state;
            const {data} = await joinLivestream(module.id);
            window.open(data, "_blank");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    getLivestreamPlayback = async () => {
        try {
            const {module} = this.state;
            const {data} = await getLivestreamPlayback(module.id);
            window.open(data, "_blank");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    render() {
        const {module, loading} = this.state;
        if (loading) return <Spin/>

        const {instanceData: {status}} = module;
        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;
        const introImg = "http://www.clipartbest.com/cliparts/9TR/Ljq/9TRLjq8Bc.gif";

        return (
            <ModuleLayout
                slug={slug}
                module={module}
                courseName={courseName}
                moduleType={ModuleType.LIVESTREAM}>
                
                <div className={styles.container}>
                    <div>
                        <img src={introImg} alt={"introduction img"} className={styles.introImg}/>
                    </div>
                    <div className={styles.actionArea}>
                        {status === LivestreamStatus.CREATED && <Button
                            type={"primary"}
                            onClick={this.startLivestream}
                            icon="forward">
                            Start Livestream</Button>}

                        {status === LivestreamStatus.RUNNING && <Button
                            type={"danger"}
                            onClick={this.endLivestream}
                            icon="rollback">
                            End livestream</Button>}

                        {status === LivestreamStatus.RUNNING && <Button
                            type={"primary"}
                            onClick={this.joinLivestream}
                            icon="login">
                            Join livestream</Button>}

                        {status === LivestreamStatus.ENDED && <Button
                            type={"ghost"}
                            icon="close">
                            This livestream is over</Button>}

                        {status === LivestreamStatus.RECORDED && <Button
                            type={"primary"}
                            onClick={this.getLivestreamPlayback}
                            icon="cloud-download">
                            Get livestream record</Button>}
                    </div>
                </div>
            </ModuleLayout>
        );
    }
}

export default Livestream;
