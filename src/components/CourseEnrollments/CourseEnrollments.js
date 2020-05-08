import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Divider, message, Spin, Table} from "antd";
import {getCourseEnrollments} from "../../services/course_service";
import moment from "moment";
import config from "../../config";
import {updateEnrollment} from "../../services/enrollment_service";

class CourseEnrollments extends Component {
    state = {
        loading: true,
        enrollments: []
    }

    async componentDidMount() {
        try {
            const {data} = await getCourseEnrollments(this.props.courseId);
            this.setState({enrollments: data, loading: false});
        } catch (e) {
            message.error("Fetch enrollments failed");
        }
    }

    updateEnrollments = async ({id, status}) => {
        try {
            const updatedValue = status === 'active' ? 'inactive' : 'active';
            const {data} = await updateEnrollment(id, updatedValue);
            const updatedEnrollments = [...this.state.enrollments];
            const enrollment = updatedEnrollments.findIndex(enroll => enroll.id === data.id);
            updatedEnrollments[enrollment].status = data.status;
            this.setState({enrollments: updatedEnrollments});
            message.success("Update successful");
        } catch (e) {
            message.error("Update status failed.");
        }
    }

    columns = [
        {
            title: 'Username',
            dataIndex: 'learner.username',
            key: 'name',
            render: text => <Link to={'/'}>{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'learner.email',
            key: 'email',
        },
        {
            title: 'At',
            dataIndex: 'since',
            key: 'since',
            render: text => (moment(text, config.timeFormat).format('HH:mm:ss DD/MM/YYYY'))
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, row) => {
                const btnType = text === 'active' ? 'primary' : 'danger';
                const display = text === 'active' ? 'Active' : 'Inactive';
                return <Button type={btnType} onClick={() => this.updateEnrollments(row)}>{display}</Button>
            }
        }
    ];

    render() {
        const {enrollments, loading} = this.state;
        if (loading) return <Spin/>

        return (
            <div>
                <h4>Course Enrollments</h4>
                <Divider/>
                <Table columns={this.columns} dataSource={enrollments} rowKey={"id"}/>
            </div>
        );
    }
}

export default CourseEnrollments;