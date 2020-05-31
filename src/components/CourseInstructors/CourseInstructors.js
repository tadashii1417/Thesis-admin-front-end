import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Divider, message, AutoComplete, Table, Icon} from "antd";
import {httpErrorHandler} from "../../utils/axios_util";
import {searchUser} from "../../services/user_service";
import styles from './CourseInstructors.module.css';
import {addCourseInstructor, removeCourseInstructor} from "../../services/instructor_service";
import {ServerErrors} from "../../constants/server_error_constant";

const {Option} = AutoComplete;

// TODO: improve user experience: ask to delete, change state, ...

class CourseInstructors extends Component {
    state = {
        loading: true,
        searchLoading: false,
        searchResult: [],
        selectedUser: null,
        instructors: this.props.instructors
    }

    removeInstructor = async (instructorId) => {
        console.log(instructorId);
        try {
            const {courseId} = this.props;
            await removeCourseInstructor(courseId, instructorId);

            let updatedInstructors = [...this.state.instructors];
            updatedInstructors = updatedInstructors.filter(i => i.id !== instructorId);
            this.setState({instructors: updatedInstructors});

            message.success("Remove instructor successful.");
        } catch (e) {
            message.error("Remove instructor failed.");
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
        console.log("e receive", e);
        this.setState({selectedUser: e});
    }

    handleAddInstructor = async () => {
        const {selectedUser} = this.state;
        if (!selectedUser) return;
        const key = "add-instructor";

        try {
            message.loading({content: "Loading", key});
            const {data} = await addCourseInstructor(this.props.courseId, parseInt(selectedUser));
            const updatedInstructors = [...this.state.instructors];
            updatedInstructors.push(data);
            this.setState({instructors: updatedInstructors});
            message.success({content: "Instructors has been added", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.INVALID_SIGNUP_DATA:
                        message.error({content: "Username must have 8-32 characters", key});
                        break;
                    case ServerErrors.INVALID_USER_TYPE:
                        message.error({content: "User is not a instructor", key});
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
            dataIndex: 'username',
            key: 'name',
            render: text => <Link to={'/'}>{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Full name',
            key: 'fullname',
            render: (_, row) => <span>{row.lastName + row.firstName}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, row) => {
                return <Button type="danger" onClick={() => this.removeInstructor(row.id)}>
                    <Icon type="delete"/>
                </Button>
            }
        }
    ];

    render() {
        const {instructors, searchLoading, searchResult} = this.state;

        const children = searchResult.map(
            user => (<Option key={user.id} value={`${user.id}`}>
                {user.email}
            </Option>));

        return (
            <div>
                <h4>Manage Instructors</h4>

                <div className={styles.searchBox}>
                    {searchLoading && <Icon type="loading" className={styles.spin}/>}
                    <AutoComplete onSearch={this.handleSearch}
                                  placeholder="search user here ..."
                                  onSelect={this.handleSelectOption}>
                        {children}
                    </AutoComplete>

                    <Button type={"primary"} icon={"form"} onClick={this.handleAddInstructor}> Enroll </Button>
                </div>

                <Divider/>
                <Table columns={this.columns} dataSource={instructors} rowKey={"id"}/>
            </div>
        );
    }
}

export default CourseInstructors;