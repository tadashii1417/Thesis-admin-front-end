import React, {Component, Suspense} from "react";
import {message, Spin, Result, Button, Modal} from 'antd';
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {ModuleType} from "../../../constants/module_constant";
import {addAssignmentFile, createAssignment, updateAssignment} from "../../../services/assignment_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";
import Loading from "../../Loading/Loading";

const NewAssignmentForm = React.lazy(() => import('./NewAssignmentForm'));
const AssignmentDetails = React.lazy(() => import('./AssignmentDetails'));

class Assignment extends Component {
    state = {
        loading: true,
        module: {},
        addModal: false,
        editModal: false
    };

    openAddModal = () => {
        this.setState({addModal: true})
    };
    closeAddModal = () => {
        this.setState({addModal: false})
    };
    openEditModal = () => {
        this.setState({editModal: true})
    };
    closeEditModal = () => {
        this.setState({editModal: false})
    };

    async componentDidMount() {
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

    handleNewAssignment = async (values) => {
        const {module} = this.state;
        try {
            const {data} = await createAssignment(module.id, values);
            let newModule = {...module};
            newModule.instanceData = data;
            this.setState({module: newModule, addModal: false});
            message.success("Create assignment successfully");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    handleEditAssignment = async (patch) => {
        const {module} = this.state;

        try {
            const {data} = await updateAssignment(module.id, patch);
            const {instanceData} = module;
            let newInstance = data;
            newInstance.attachmentFiles = instanceData.attachmentFiles;
            let newModule = {...module, instanceData: newInstance};
            this.setState({module: newModule, editModal: false});
            message.success('Assignment has been updated');
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong")
                }
            })
        }
    };

    handleAddAttachment = async (upload) => {
        const {module} = this.state;
        const key = "add-file";

        try {
            message.loading({content: "Loading", key});
            const {data} = await addAssignmentFile(module.id, upload.fileList);
            this.handleUpdateFileList(data);
            message.success({content: "File added !", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Something went wrong", key})
                }
            })
        }
    };

    handleUpdateFileList = (files) => {
        const {module} = this.state;
        let updatedModule = {...module};
        updatedModule.instanceData = {...module.instanceData};
        updatedModule.instanceData.attachmentFiles = files;
        this.setState({module: updatedModule});
    };

    render() {
        const {module, loading, addModal, editModal} = this.state;
        if (loading) return <Spin/>;

        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout module={module}
                          moduleType={ModuleType.ASSIGNMENT}
                          courseName={courseName}
                          slug={slug}>

                {module.instanceData ?
                    (<Suspense fallback={<Loading/>}>
                            <AssignmentDetails
                                module={module}
                                visible={editModal}
                                handleCloseEdit={this.closeEditModal}
                                handleOpenEdit={this.openEditModal}
                                handleEditAssignment={this.handleEditAssignment}
                                handleUpdateFileList={this.handleUpdateFileList}
                                handleAddAttachment={this.handleAddAttachment}
                            />
                        </Suspense>
                    ) :
                    (<Result status="404" title="404"
                             subTitle="This is no content yet."
                             extra={<Button type={"primary"} onClick={this.openAddModal}>
                                 Edit content </Button>}/>)
                }

                <Modal visible={addModal}
                       title={"Edit assignment"}
                       width={'60%'}
                       onCancel={this.closeAddModal} footer={null}>
                    <Suspense fallback={null}>
                        <NewAssignmentForm handleNewAssignment={this.handleNewAssignment}/>
                    </Suspense>
                </Modal>

            </ModuleLayout>
        );
    }

}

export default Assignment;