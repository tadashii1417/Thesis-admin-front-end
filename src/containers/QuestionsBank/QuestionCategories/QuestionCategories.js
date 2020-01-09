import React, {Component} from 'react';
import styles from './QuestionCategories.module.css';
import {Icon, Typography, Divider, Button, Table, Modal} from 'antd';
import CategoryForm from './Form/Form';

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
        title: 'Development',
        description: "",
        slug: "development",
        count: 10,
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Web development',
                description: "",
                slug: "web-development",
                count: 10,
                value: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'Javascript',
                        description: "javascript",
                        slug: "javascript",
                        count: 10,
                        value: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: 'React JS',
                        description: "",
                        slug: "react-js",
                        count: 10,
                        value: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                ]
            },
            {
                title: 'Mobile Apps',
                description: "",
                slug: "mobile-apps",
                count: 10,
                value: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: 'Business',
        description: "",
        slug: "business",
        count: 10,
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Finance',
                description: "",
                slug: "finance",
                count: 10,
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Entrepreneurship',
                description: "entrepreneurship",
                slug: "",
                count: 10,
                value: '0-1-1',
                key: '0-1-1',
            }
        ]
    },
];


export default class extends Component {
    state = {
        visible: false
    };

    columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
    handlerCancel = () => {
        this.setState({visible: false});
    };

    render() {
        return (
            <div>
                <Title level={4}>Course Categories</Title>
                <Divider/>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.addTitle}>Add New Question Category</div>
                        <CategoryForm treeData={treeData}/>
                        <Divider/>
                        <Button type={"primary"}>Add Category</Button>
                    </div>
                    <Modal visible={this.state.visible} onOk={this.handlerCancel} onCancel={this.handlerCancel}
                           title="Edit Category !">
                        <CategoryForm treeData={treeData}/>
                    </Modal>
                    <div className={styles.right}>
                        <div className={styles.addTitle}>Current Categories</div>
                        <Table columns={this.columns} dataSource={treeData}/>
                    </div>
                </div>
            </div>
        );
    }
}