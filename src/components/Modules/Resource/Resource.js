import React, {Component} from "react";
import {Upload, Icon as AntIcon, message, Divider, Button, Icon, Modal} from "antd";
import styles from "./Resource.module.css";
import {ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createResource} from "../../../services/resource_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";
import {removeFile} from "../../../services/file_service";
import Loading from "../../Loading/Loading";

const {Dragger} = Upload;
const {confirm} = Modal;

class Resource extends Component {
    state = {
        loading: true,
        module: {},
        files: []
    };

    async componentDidMount() {
        await this.fetchModule();
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
            message.error({content: "Something went wrong", key});
        }
    };

    onChangeFiles = (e) => {
        this.setState({files: e.fileList});
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

    createResource = async () => {
        const {files} = this.state;
        if (files.length === 0) {
            message.warning("Please select at least one file");
            return;
        }

        const key = "upload-resource";
        try {
            message.loading({content: "Processing ...", key});
            await createResource(this.state.module.id, files);
            await this.fetchModule();
            message.success({content: "Upload file successfully", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Something went wrong", key});
                }
            })
        }
    }

    showDeleteConfirm = (file) => {
        confirm({
            title: `Are you sure to delete this file ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeAttachmentFile(file.id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    removeAttachmentFile = async (id) => {
        const {module} = this.state;
        let updatedModule = {...module};
        updatedModule.instanceData = {...module.instanceData};

        const key = "remove-file";
        try {
            message.loading({content: "Loading", key});
            await removeFile(id);
            const newFiles = updatedModule.instanceData.files.filter(file => file.id !== id);

            updatedModule.instanceData.files = newFiles;
            this.setState({module: updatedModule});

            message.success({content: 'Attachment file has been removed', key})
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error({content: "Something went wrong", key})
            })
        }
    };

    render() {
        const {module, loading} = this.state;
        if (loading) return <Loading/>;

        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout module={module}
                          courseName={courseName}
                          slug={slug}
                          handleEditModule={this.handleEditModule}
                          moduleType={ModuleType.RESOURCE}>
                {module.instanceData ?
                    <>
                        <h4><AntIcon type="double-right" className={styles.icon}/>
                            Your uploaded file
                        </h4>
                        <Divider/>
                        <div className={styles.files}>
                            {module.instanceData.files.map(file =>
                                <div key={file.id}>
                                    <Icon type={'delete'} className={styles.deleteFile}
                                          onClick={() => this.showDeleteConfirm(file)}/>

                                    <Button onClick={() => window.open(file.url, '_blank')} icon={"paper-clip"}>
                                        {file.displayName}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                    :
                    <div>
                        <h4><AntIcon type="double-right" className={styles.icon}/>
                            Select file to upload
                        </h4>
                        <Divider/>

                        <div>
                            <Dragger multiple={true} onChange={this.onChangeFiles} className={styles.draggerArea}>
                                <p className="ant-upload-drag-icon"><AntIcon type="inbox"/></p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single upload only !</p>
                            </Dragger>
                            <div className={styles.uploadBtn}>
                                <Button onClick={this.createResource} type={"primary"}>Upload</Button>
                            </div>
                        </div>
                    </div>
                }
            </ModuleLayout>
        );
    }
}

export default Resource;
