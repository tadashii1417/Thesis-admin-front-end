import React, {Component} from "react";
import {Button, message} from "antd";
import styles from "./Livestream.module.css";
import {LivestreamStatus, ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {
    createLivestream,
    endLivestream,
    getLivestreamPlayback,
    joinLivestream,
    startLivestream
} from "../../../services/livestream_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";
import Loading from "../../Loading/Loading";
import NewLivestream from "./NewLivestream";
import LivestreamInfo from "./LivestreamInfo";
import {ServerErrors} from "../../../constants/server_error_constant";

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

    handleCreateLivestream = async (values) => {
        const key = "create_livestream";
        message.loading({content: "Loading ...", key})
        try {
            await createLivestream(this.state.module.id, values);
            const {data} = await getModule(this.state.module.id);
            this.setState({module: data});
            message.success({content: "Create livestream success", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.INVALID_START_AT:
                        message.error({content: "Livestream must start after this moment", key});
                        break;

                    default:
                        message.error({content: "Something went wrong", key});
                }
            })
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
        if (loading) return <Loading/>;
        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        if (!module.instanceData) {
            return (
                <ModuleLayout
                    slug={slug}
                    module={module}
                    courseName={courseName}
                    handleEditModule={this.handleEditModule}
                    moduleType={ModuleType.LIVESTREAM}>
                    <div style={{width: "60%", minWidth: "300px", margin: "0 auto"}}>
                        <NewLivestream moduleId={module.id} handleCreateLivestream={this.handleCreateLivestream}/>
                    </div>
                </ModuleLayout>
            );
        }

        const {instanceData: {status}} = module;

        return (
            <ModuleLayout
                slug={slug}
                module={module}
                courseName={courseName}
                handleEditModule={this.handleEditModule}
                moduleType={ModuleType.LIVESTREAM}>

                <div className={styles.container}>
                    <div style={{width: "60%", minWidth: "300px", margin: "0 auto"}}>
                        <LivestreamInfo data={module.instanceData}/>
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
