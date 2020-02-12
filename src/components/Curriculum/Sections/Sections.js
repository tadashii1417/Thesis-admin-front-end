import React, {Component} from "react";
import Collapsible from "react-collapsible";
import {Button, Divider, Icon, Modal, message} from "antd";
import styles from './Sections.module.css';
import {
    sortableHandle,
} from 'react-sortable-hoc';
import AddActivity from "../AddModule/AddModule";
import ModuleList from "../ModuleList/ModuleList";
import {httpErrorHandler} from "../../../utils/axios_util";
import axios from '../../../axios-config';

const DragHandle = sortableHandle(() =>
    <span style={{marginRight: '15px'}}>
        <Icon type={'menu'} style={{color: '#1890ff'}}/>
    </span>
);

class Sections extends Component {
    state = {
        isAddModule: false
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
            const {data} = await axios.post('/api/sections/' + id + '/modules', values);
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

    render() {
        const {sections, value} = this.props;
        return (
            <Collapsible trigger={
                <div className={styles.collapseHead}>
                    {value.order !== null ? <DragHandle/> : ""}
                    <h4 style={{display: 'inline-block'}}>Section {sections.findIndex(ele => ele.id === value.id)} : {value.title}</h4>
                    <div>
                        <Button>
                            <Icon type={"edit"} theme="twoTone" onClick={(e) => {
                                alert("deleted !");
                                e.stopPropagation();
                            }}/>
                        </Button>
                        <Divider type="vertical"/>
                        <Button>
                            <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96" onClick={(e) => {
                                alert("deleted !");
                                e.stopPropagation();
                            }}/>
                        </Button>
                    </div>
                </div>
            }>

                <ModuleList modules={value.modules}/>

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
                    <AddActivity handleNewModule={this.handleNewModule}/>
                </Modal>
            </Collapsible>
        );
    }
}

export default Sections;