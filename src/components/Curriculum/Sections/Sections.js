import React, {Component} from "react";
import Collapsible from "react-collapsible";
import {Button, Divider, Icon, Modal, Tag} from "antd";
import styles from './Sections.module.css';
import {
    sortableHandle,
} from 'react-sortable-hoc';
import AddActivity from "../AddActivity/AddActivity";

const DragHandle = sortableHandle(() =>
    <span style={{marginRight: '15px'}}>
        <Icon type={'menu'} style={{color: '#1890ff'}}/>
    </span>
);

class Sections extends Component {
    state = {
        isAddActivity: false
    };

    handleOkNewActivity = () => {
        this.setState({isAddActivity: false});
    };

    render() {
        const {sessions, value, children} = this.props;

        return (
            <Collapsible trigger={
                <div className={styles.collapseHead}>
                    <DragHandle/>
                    <h4 style={{display: 'inline-block'}}>Section {sessions.findIndex(ele => ele.title === value)} : {value}</h4>
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
                {children}
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type={"link"} icon={"plus"} onClick={() => {
                        this.setState({isAddActivity: true})
                    }}>Add an activity</Button>
                </div>

                <Modal title={"Add new activity"}
                       visible={this.state.isAddActivity}
                       onOk={this.handleOkNewActivity}
                       onCancel={this.handleOkNewActivity}
                       bodyStyle={{padding: "12px 24px"}}
                >
                    <AddActivity name={value}/>
                </Modal>
            </Collapsible>
        );
    }
}

export default Sections;