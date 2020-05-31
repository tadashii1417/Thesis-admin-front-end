import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Divider, message, AutoComplete, Spin, Table, Icon} from "antd";
import {getCourseEnrollments} from "../../services/course_service";
import moment from "moment";
import config from "../../config";
import {createEnrollment, updateEnrollment} from "../../services/enrollment_service";
import {httpErrorHandler} from "../../utils/axios_util";
import styles from './CourseEnrollments.module.css';
import {searchUser} from "../../services/user_service";
import {ServerErrors} from "../../constants/server_error_constant";

const {Option} = AutoComplete;

class CourseEnrollments extends Component {
    state = {
        loading: true,
        searchLoading: false,
        searchResult: [],
        selectedUser: null,
        enrollments: []
    }

    async componentDidMount() {
        await this.fetchEnrollments();
    }

    fetchEnrollments = async () => {
        try {
            const {data} = await getCourseEnrollments(this.props.courseId);
            this.setState({enrollments: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Fetch enrollments failed");
                }
            })
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

    handleSearch = async (e) => {
        if (e === "") {
            this.setState({searchLoading: false})
            return;
        }
        try {
            this.setState({searchLoading: true})
            const {data} = await searchUser(e);
            this.setState({searchLoading: false, searchResult: data});
        } catch (e) {
            message.error("something went wrong");
        }
    }

    handleSelectOption = (e) => {
        this.setState({selectedUser: e});
    }

    handleAddEnrollment = async () => {
        const {selectedUser} = this.state;
        if (!selectedUser) return;
        const key = "create-enrollment";

        try {
            message.loading({content: "Loading", key});
            await createEnrollment(this.props.courseId, parseInt(selectedUser));
            message.success({content: "Enrollment has been added", key});
            this.setState({loading: true});
            await this.fetchEnrollments();
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.INVALID_USER_TYPE:
                        message.error({content: "This user is not a learner", key});
                        break;
                    case ServerErrors.ENROLLMENT_ALREADY_EXISTS:
                        message.error({content: "This student've already enrolled this course", key});
                        break;
                    default:
                        message.error({content: "Something went wrong", key});
                }
            })
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
            title: 'Last login',
            dataIndex: 'learner.lastLogin',
            key: 'lastLogin'
        },
        {
            title: 'Since',
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
        const {enrollments, loading, searchLoading, searchResult} = this.state;
        if (loading) return <Spin/>;

        const children = searchResult.map(
            user => {
                return (<Option key={user.id} value={`${user.id}`} display={user.firstName + user.lastName}>
                    <Icon type={"user"}/>
                    {user.email}
                </Option>)
            });


        return (
            <div>
                <h4>Course Enrollments</h4>

                <div className={styles.searchBox}>
                    {searchLoading && <Icon type="loading" className={styles.spin}/>}
                    <AutoComplete onSearch={this.handleSearch}
                                  placeholder="search user here ..."
                                  optionLabelProp={'display'}
                                  onSelect={this.handleSelectOption}>
                        {children}
                    </AutoComplete>

                    <Button type={"primary"} icon={"form"} onClick={this.handleAddEnrollment}> Enroll </Button>
                </div>

                <Divider/>
                <Table columns={this.columns} dataSource={enrollments} rowKey={"id"}/>
            </div>
        );
    }
}

export default CourseEnrollments;