import React, {Component} from "react";
import Collapsible from "react-collapsible";
import {Button, Divider, Icon, Modal, message} from "antd";
import styles from './Sections.module.css';
import {
    sortableHandle,
} from 'react-sortable-hoc';
import NewModule from "../AddModule/AddModule";
import ModuleList from "../ModuleList/ModuleList";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createNewModule} from "../../../services/module_service";
import {createNewQuiz} from "../../../services/quiz_service";
import {ModuleType} from '../../../constants/module_constant';
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
        isAddModule: false,
        editModal: false,
    };

    handleCancel = () => {
        this.setState({isAddModule: false});
    };

    handleOK = () => {
        this.setState({isAddModule: true})
    };

    handleNewModule = async (values) => {
        try {
            const {id} = this.props.value;
            const {modules} = this.props.value;

            const {data} = await createNewModule(values, modules, id);
            if (data.type === ModuleType.QUIZ) {
                await createNewQuiz(data.id);
            }

            this.props.value.modules.push(data);

            message.success("New module has been created");
            this.setState({isAddModule: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
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

                    {value.order !== null ? <DragHandle/> : ""}
                    <h4 style={{display: 'inline-block'}}>
                        Section {sections.findIndex(ele => ele.id === value.id)} : {value.title}
                    </h4>

                    <div>
                        <Button onClick={this.openEditSectionModal}>
                            <Icon type={"edit"} theme="twoTone"/>
                        </Button>

                        <Divider type="vertical"/>

                        <Button onClick={(e)=> {this.showDeleteConfirm(value.id, e)}}>
                            <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96"/>
                        </Button>
                    </div>

                </div>
            }>

                <ModuleList course={course} modules={value.modules}/>

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type={"link"} icon={"plus"}
                            onClick={this.handleOK}
                            style={{border: '1px solid', margin: '10px'}}>
                        Add new module
                    </Button>
                </div>

                <Modal title={"Add New Module"}
                       visible={this.state.isAddModule}
                       onCancel={this.handleCancel}
                       bodyStyle={{padding: "12px 24px"}}
                       footer={null}>
                    <NewModule handleNewModule={this.handleNewModule}/>
                </Modal>


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