import React, {Component} from "react";
import {Divider, Table, Avatar, Tag, Spin, message} from 'antd';

import styles from './Assignment.module.css';
import {defaultAvatar} from "../../../constants/dev_constant";
import {downloadFile} from "../../../utils/file_util";
import {httpErrorHandler} from "../../../utils/axios_util";
import {fetchSubmissions} from "../../../services/assignment_service";

class AssignmentSubmissions extends Component {
    state = {
        loading: true,
        submissions: []
    };

    async componentDidMount() {
        const {module} = this.props;
        try {
            const {data} = await fetchSubmissions(module.id);
            this.setState({submissions: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => (text ? <Avatar src={text}/> : <Avatar src={defaultAvatar}/>)
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, row) => (<span>{row.firstName} {row.lastName}</span>)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Submission files',
            dataIndex: 'files',
            key: 'files',
            render: files =>
                (files.map(file => <Tag color="#108ee9" style={{cursor: 'pointer'}}
                                        onClick={() => downloadFile(file)}>
                    {file.displayName}</Tag>))
        },
    ];

    render() {
        const {loading, submissions} = this.state;
        if (loading) return <Spin/>

        return (
            <div className={styles.assignmentContent}>
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
                <Table dataSource={submissions} columns={this.columns}/>
            </div>
        );
    }
}

export default AssignmentSubmissions;