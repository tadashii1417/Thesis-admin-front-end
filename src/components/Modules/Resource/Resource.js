import React, {Component} from "react";
import {Breadcrumb, Upload, Icon as AntIcon, message, Spin, Divider, Button} from "antd";
import styles from "./Resource.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createResource} from "../../../services/resource_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

const {Dragger} = Upload;

class Resource extends Component {
    state = {
        loading: true,
        module: {},
    };

    async componentDidMount() {
        await this.fetchModule();
    }

    fetchModule = async () => {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            this.setState({module: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error("Something went wrong");
            });
        }
    }

    createResource = async (file) => {
        try {
            await createResource(this.state.module.id, file);
            await this.fetchModule();
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    render() {
        const {module, loading} = this.state;
        if (loading) return <Spin/>;

        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout module={module} courseName={courseName} slug={slug} moduleType={ModuleType.RESOURCE}>
                {module.instanceData ?
                        <>
                            <h4><AntIcon type="double-right" className={styles.icon}/>
                                Your uploaded file
                            </h4>
                            <Divider/>
                            <div className={styles.files}>
                                <Button onClick={() => window.open(module.instanceData.url, '_blank')}
                                        icon={"paper-clip"}>
                                    {module.instanceData.displayName}
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <h4><AntIcon type="double-right" className={styles.icon}/>
                                Select file to upload
                            </h4>
                            <Divider/>

                            <div className={styles.dragger}>
                                <Dragger
                                    customRequest={(req) => {this.createResource(req.file);
                                    }}>
                                    <p className="ant-upload-drag-icon"><AntIcon type="inbox"/></p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single upload only !</p>
                                </Dragger>
                            </div>
                        </>
                }
            </ModuleLayout>
        );
    }
}

export default Resource;
