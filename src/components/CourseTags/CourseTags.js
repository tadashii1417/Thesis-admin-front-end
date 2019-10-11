import React, {Component} from 'react';
import styles from './CourseTags.module.css';
import {Icon, Typography, Modal, Divider, Button, Table, Tag} from 'antd';
import InputForm from './Form/Form';

const {Title} = Typography;
const {confirm} = Modal;
function showDeleteConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const treeData = [
    {
        title: 'css',
        description: "",
        slug: "css",
        count: 10,
        value: '0-00',
        key: '0-00',
    },
    {
        title: 'develop',
        description: "",
        slug: "development",
        count: 10,
        value: '0-0',
        key: '0-0',
    },
    {
        title: 'business',
        description: "",
        slug: "business",
        count: 10,
        value: '0-1',
        key: '0-1',
    },
    {
        title: 'HTML',
        description: "",
        slug: "html",
        count: 1,
        value: '0-11',
        key: '0-11',
    },
    {
        title: 'javascript',
        description: "simple tag description",
        slug: "html",
        count: 1,
        value: '0-12',
        key: '0-12',
    },
];

export default class extends Component {
    state = {
        visible: false
    }

    columns = [
        {
            title: 'Tag',
            dataIndex: 'title',
            key: 'title',
            render: tag => {
                let color = "green";
                if (tag.length > 7) {
                    color = "geekblue";
                } else if (tag.length > 3) {
                    color = "volcano";
                } else {
                    color = "green";
                }
                return (
                    <Tag color={color}>
                        {tag.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            width: '30%',
            key: 'slug',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (<div>
                    <Icon type="edit" theme="twoTone" onClick={() => {
                        this.setState({visible: true});
                    }}/>
                    <Divider type="vertical"/>
                    <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" onClick={showDeleteConfirm}/>
                </div>);
            }
        }
    ];

    handleCancel = e => {
        this.setState({visible: false});
    }

    render() {
        return (
            <div>
                <div>
                    <Title level={4}>Course Tags</Title>
                </div>
                <Divider/>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.addTitle}>Add New Course Tag</div>
                        <InputForm/>
                        <Divider/>
                        <Button type={"primary"}>Add Tag</Button>
                    </div>
                    <Modal visible={this.state.visible} title="Edit current tag !" onCancel={this.handleCancel}
                           onOk={this.handleCancel}>
                        <InputForm/>
                    </Modal>
                    <div className={styles.right}>
                        <div className={styles.addTitle}>
                            Current Tags
                        </div>
                        <Table columns={this.columns} dataSource={treeData}/>
                    </div>
                </div>
            </div>
        );
    }
}
