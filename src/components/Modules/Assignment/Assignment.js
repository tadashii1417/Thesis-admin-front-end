import React, {Component, Suspense} from "react";
import {message, Spin, Result, Button, Modal, Breadcrumb, Tabs} from 'antd';
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import styles from './Assignment.module.css';
import NewAssignmentForm from "./NewAssignmentForm";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import AssignmentDetails from "./AssignmentDetails";
import {addAssignmentFile, createAssignment, updateAssignment} from "../../../services/assignment_service";


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
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
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
        try {
            message.loading({content: "loading", key: 'add-file'});
            const {data} = await addAssignmentFile(module.id, upload.fileList);
            this.handleUpdateFileList(data);
            message.success({content: "Files added", key: 'add-file'});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Something went wrong", key: 'add-file'})
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
                            icon={ModulesConfig[ModuleType.ASSIGNMENT].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.ASSIGNMENT].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>
                <div className="adminContent">
                    {module.instanceData ?
                        (
                            <AssignmentDetails
                                data={module.instanceData}
                                visible={editModal}
                                handleCloseEdit={this.closeEditModal}
                                handleOpenEdit={this.openEditModal}
                                handleEditAssignment={this.handleEditAssignment}
                                handleUpdateFileList={this.handleUpdateFileList}
                                handleAddAttachment={this.handleAddAttachment}
                            />
                        ) :
                        (
                            <Result status="404" title="404" subTitle="This is no content yet."
                                    extra={<Button type={"primary"} onClick={this.openAddModal}> Edit
                                        content </Button>}/>
                        )}


                    <Modal visible={addModal}
                           title={"Edit assignment"}
                           width={'60%'}
                           onCancel={this.closeAddModal} footer={null}>
                        <NewAssignmentForm handleNewAssignment={this.handleNewAssignment}/>
                    </Modal>
                </div>

            </>
        );
    }

}

export default Assignment;