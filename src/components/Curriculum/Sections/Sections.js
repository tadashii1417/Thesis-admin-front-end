import React, {Component} from "react";
import Collapsible from "react-collapsible";
import {Button, Divider, Icon, Modal, message, Tooltip} from "antd";
import styles from './Sections.module.css';
import {
    sortableHandle,
} from 'react-sortable-hoc';
import ModuleList from "../ModuleList/ModuleList";
import {httpErrorHandler} from "../../../utils/axios_util";
import EditSection from "../EditSection/EditSection";
import {deleteSection} from "../../../services/section_service";

const {confirm} = Modal;

const DragHandle = sortableHandle(() =>
    <span style={{marginRight: '15px'}}>
        <Icon type={'menu'} style={{color: '#1890ff'}}/>
    </span>
);

class Sections extends Component {
    state = {
        editModal: false,
    };

    openEditSectionModal = (e) => {
        e.stopPropagation();
        this.setState({editModal: true})
    };

    closeEditSectionModal = () => {
        this.setState({editModal: false});
    };

    showDeleteConfirm = (id, e) => {
        e.stopPropagation();
        const {handleDeleleSection} = this.props;

        confirm({
            title: 'Are you sure delete this section?',
            content: 'This action cannot be reverted, all modules inside will be deleted too',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteSection(id);
                    handleDeleleSection(id);
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error("Something went wrong");
                        }
                    })
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    render() {
        const {course, sections, value} = this.props;
        return (
            <Collapsible trigger={
                <div className={styles.collapseHead}>

                    <DragHandle/>
                    <h4 style={{display: 'inline-block'}}>
                        Section {sections.findIndex(ele => ele.id === value.id)} : {value.title}
                    </h4>

                    <div>
                        {value.order == null &&
                        <Tooltip title={"This section is only show to student who've enrolled the course."}>
                            <Button>
                                <Icon type={"info-circle"} theme="twoTone"/>
                            </Button>
                        </Tooltip>
                        }

                        <Divider type="vertical"/>

                        <Button onClick={this.openEditSectionModal}>
                            <Icon type={"edit"} theme="twoTone"/>
                        </Button>

                        <Divider type="vertical"/>

                        <Button onClick={(e) => {
                            this.showDeleteConfirm(value.id, e)
                        }}>
                            <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96"/>
                        </Button>
                    </div>

                </div>
            } open={true}>

                <ModuleList course={course} value={value}/>

                <Modal title={"Edit Sections"}
                       visible={this.state.editModal}
                       onCancel={this.closeEditSectionModal}
                       footer={null}>
                    <EditSection data={value} closeModal={this.closeEditSectionModal}/>
                </Modal>
            </Collapsible>
        );
    }
}

export default Sections;