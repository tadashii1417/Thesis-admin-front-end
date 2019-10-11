import React from "react";
import {Divider, Table, Typography, Avatar, Button} from 'antd';

import styles from './Assignment.module.css';

const {Title} = Typography;

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        grade: 5,
        time: 'Thursday, 23 February 2017, 12:17 PM',
    },
    {
        key: '2',
        name: 'John',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        grade: 10,
        time: 'Thursday, 23 February 2017, 12:17 PM',
    },
];

const columns = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: text => (<Avatar src={text} />)
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

export default function (props) {

    return (
        <div className="adminContent">
            <Title level={4}>Assignment 1: Functional Programming</Title>
            <Button type={"primary"} icon={"setting"} className="iconEdit">Edit Setting</Button>

            <Divider/>
            <div className={styles.assignmentContent}>
                <h4>Description</h4>
                <Divider className={styles.divider}/>
                Keep it short! Type or Record your answer! <br/>Record with the audio or video buttons above!<br/>
                From your readings, define Digital Literacy in no more than 15 words.
                Can you master the art of being succinct?
                <br/><br/>
                <h4>Grading Summary</h4>
                <Divider className={styles.divider}/>
                <table style={{width: "100%"}}>
                    <tbody className={styles.table}>
                    <tr>
                        <td>Participants</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Submitted</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Due date</td>
                        <td>Thursday, 26 December 2019, 1:00 AM</td>
                    </tr>
                    <tr>
                        <td>Time remaining</td>
                        <td>76 days 15 hours</td>
                    </tr>
                    </tbody>
                </table>

                <br/><br/>
                <h4>Student Submissions</h4>
                <Divider className={styles.divider}/>
                <Table dataSource={dataSource} columns={columns}/>
            </div>


        </div>
    );
}