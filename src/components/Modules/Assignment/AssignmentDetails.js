import React, {Component, Suspense} from "react";
import {Button, Divider, Modal, Tabs, Tag} from "antd";
import styles from "./Assignment.module.css";
import Loading from "../../Loading/Loading";
import {EditorContent} from "doodle-editor";
import moment from "moment";
import config from "../../../config";
import {downloadFile} from "../../../utils/file_util";
import EditAssignmentForm from "./EditAssignmentForm";

const {TabPane} = Tabs;

const AssignmentReport = React.lazy(() => import('./AssignmentReport'));

class AssignmentDetails extends Component {
    render() {
        const {data, visible, handleCloseEdit, handleOpenEdit, handleEditAssignment} = this.props;

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
                            {data.attachmentFiles.map(file => {
                                return (
                                    <div className={styles.fileContainer} key={file.id}>
                                        <Button onClick={(e) => downloadFile(file, e)} icon={"paper-clip"}>
                                            {file.displayName}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.editButton}>
                            <Button type={"primary"} icon={"setting"}
                                    onClick={handleOpenEdit}>Edit setting</Button>
                        </div>

                        <Modal visible={visible}
                               title={"Edit assignment"}
                               width={'60%'}
                               onCancel={handleCloseEdit} footer={null}>
                            <EditAssignmentForm handleEditAssignment={handleEditAssignment} data={data}/>
                        </Modal>
                    </div>
                </TabPane>

                <TabPane tab={'Submissions'} key='submission'>
                    <Suspense fallback={Loading}>
                        <AssignmentReport/>
                    </Suspense>
                </TabPane>
            </Tabs>
        );
    }
}

export default AssignmentDetails;