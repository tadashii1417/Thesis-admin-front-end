import React from "react";
import {Table, Icon} from "antd";
import styles from './QuestionsBank.module.css';
import '../admin.css';

import {Typography, Button, Divider, Input} from "antd";
import {Link} from "react-router-dom";

const {Title} = Typography;
const {Search} = Input;

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: text => <a href="/">{text}</a>
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author"
    },
    {
        title: "Type",
        key: "type",
        dataIndex: "type"
    },
    {
        title: "Date",
        key: "date",
        dataIndex: "date"
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return (<div>
                <Icon type="edit" theme="twoTone"/>
                <Divider type="vertical"/>
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"/>
            </div>);
        }
    }
];

const data = [
    {
        key: "1",
        title: "Find biggest number",
        author: "tadashii",
        type: 'Single Choice',
        date: "20/10/2019"
    },
    {
        key: "2",
        title: "What do you like ?",
        author: "tadashii",
        type: 'Fill in the blank',
        date: "20/10/2019"
    },
    {
        key: "3",
        title: "True or false ?",
        author: "tadashii",
        type: 'True or False',
        date: "20/10/2019"
    },
    {
        key: "4",
        title: "Where are you come from ?",
        author: "tadashii",
        type: 'Multiple Choice',
        date: "20/10/2019"
    },

];

export default function (props) {
    return (
        <div className="adminContent">
            <div className={styles.container}>
                <Title level={4}>Question Bank</Title>
                <Divider/>
                <div className={styles.toolbar}>
                    <Link to={"/new-question"}>
                        <Button icon="plus" type="primary">
                            Add new
                        </Button>
                    </Link>
                    <Search
                        placeholder="Search questions."
                        onSearch={value => console.log(value)}
                        className={styles.searchBox}
                        enterButton
                    />
                </div>
                <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    );
}
