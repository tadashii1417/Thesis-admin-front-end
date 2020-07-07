import React, {Component} from "react";
import {Divider, Table, Avatar, Tag, message} from 'antd';

import styles from './Assignment.module.css';
import {defaultAvatar} from "../../../constants/dev_constant";
import {httpErrorHandler} from "../../../utils/axios_util";
import {fetchSubmissions} from "../../../services/assignment_service";
import Loading from "../../Loading/Loading";

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
            render: files => (files.map(file => <a href={file.url} download={file.displayName}>
                <Tag color="#108ee9" style={{cursor: 'pointer', margin: '2px'}}>{file.displayName}</Tag>
            </a>))
        },
    ];

    render() {
        const {loading, submissions} = this.state;
        if (loading) return <Loading/>;

        return (
            <div className={styles.assignmentContent}>
                <h4>Student Submissions</h4>
                <Divider className={styles.divider}/>
                <Table dataSource={submissions} columns={this.columns}/>
            </div>
        );
    }
}

export default AssignmentSubmissions;
