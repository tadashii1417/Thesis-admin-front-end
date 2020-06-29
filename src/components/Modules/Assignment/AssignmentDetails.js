import React, {Component, Suspense} from "react";
import {Button, Divider, Icon, message, Modal, Tabs, Upload} from "antd";
import styles from "./Assignment.module.css";
import Loading from "../../Loading/Loading";
import {EditorContent} from "lerna-rte";
import moment from "moment";
import config from "../../../config";
import {httpErrorHandler} from "../../../utils/axios_util";
import {removeFile} from "../../../services/file_service";

const {TabPane} = Tabs;
const {confirm} = Modal;

const AssignmentSubmissions = React.lazy(() => import('./AssignmentSubmissions'));
const EditAssignmentForm = React.lazy(() => import('./EditAssignmentForm'));

class AssignmentDetails extends Component {
    state = {
        addFile: []
    };

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
        const {module} = this.props;
        const {attachmentFiles} = module.instanceData;
        const key = "remove-file";
        try {
            message.loading({content: "Loading", key});

            await removeFile(id);
            const newFiles = attachmentFiles.filter(file => file.id !== id);
            this.props.handleUpdateFileList(newFiles);
            message.success({content: 'Attachment file has been removed', key})
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Something went wrong", key})
                }
            })
        }
    };


    render() {
        const {module, visible, handleCloseEdit, handleOpenEdit, handleEditAssignment, handleAddAttachment} = this.props;
        const data = module.instanceData;
        return (
            <Tabs type={"card"}>
                <TabPane tab={'Details'} key='detail'>
                    <div className={styles.assignmentContent}>
                        <div>
                            <h4>Description</h4>
                            <Divider className={styles.divider}/>
                            <EditorContent content={data.intro}/>
                        </div>

                        <div>
                            <h4>Time Range</h4>
                            <Divider className={styles.divider}/>
                            {data.openAt ? moment(data.openAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') :
                                <span>&nbsp;</span>}
                            &nbsp;&nbsp;&rarr;&nbsp;&nbsp;
                            {data.closeAt ? moment(data.closeAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') :
                                <span>&nbsp;</span>}
                        </div>

                        <div>
                            <h4>Attachment Files</h4>
                            <Divider className={styles.divider}/>
                            {data.attachmentFiles ? data.attachmentFiles.map(file => {
                                return (
                                    <div className={styles.fileContainer} key={file.id}>
                                        <Icon type={'delete'} className={styles.deleteFile}
                                              onClick={() => this.showDeleteConfirm(file)}/>
                                        <Button onClick={() => window.open(file.url, '_blank')} icon={"paper-clip"}>
                                            {file.displayName}
                                        </Button>
                                    </div>
                                );
                            }) : ""}
                            <Upload
                                multiple={false}
                                beforeUpload={() => false}
                                onChange={handleAddAttachment}
                                fileList={this.state.addFile}
                                showUploadList={true}>
                                <Button type={"dashed"} icon={'plus'} style={{color: '#40a9ff', marginLeft: '40px'}}>
                                    Add file
                                </Button>
                            </Upload>
                        </div>

                        <div className={styles.editButton}>
                            <Button type={"primary"} icon={"setting"}
                                    onClick={handleOpenEdit}>Edit setting</Button>
                        </div>

                        <Modal visible={visible}
                               title={"Edit assignment"}
                               width={'60%'}
                               onCancel={handleCloseEdit} footer={null}>
                            <Suspense fallback={null}>
                                <EditAssignmentForm handleEditAssignment={handleEditAssignment} data={data}/>
                            </Suspense>
                        </Modal>
                    </div>
                </TabPane>

                <TabPane tab={'Submissions'} key='submission'>
                    <Suspense fallback={<Loading/>}>
                        <AssignmentSubmissions module={module}/>
                    </Suspense>
                </TabPane>
            </Tabs>
        );
    }
}

export default AssignmentDetails;
