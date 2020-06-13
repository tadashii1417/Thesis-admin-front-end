import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Divider, message, AutoComplete, Table, Icon, Tooltip, Popconfirm} from "antd";
import {httpErrorHandler} from "../../utils/axios_util";
import {searchUser} from "../../services/user_service";
import styles from './CourseInstructors.module.css';
import {addCourseInstructor, removeCourseInstructor, updateCourseInstructor} from "../../services/instructor_service";
import {ServerErrors} from "../../constants/server_error_constant";
import {getDisplayName} from "../../utils/string_util";
import {createPatch} from "../../utils/patch_util";

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

    updateCourseInstructor = async (field, row) => {
        try {
            const patch = [];
            let updatedValue;
            if (field === 'visible') {
                updatedValue = !row.visible;
            } else {
                updatedValue = row.status === 'active' ? 'inactive' : 'active';
            }
            createPatch(patch, field, updatedValue);
            await updateCourseInstructor(this.props.courseId, row.id, patch);

            const updatedInstructors = [...this.state.instructors];
            const index = updatedInstructors.findIndex(i => i.id === row.id);
            updatedInstructors[index][field] = updatedValue;
            this.setState({instructors: updatedInstructors});
            message.success("Update course instructor successful");
        } catch (e) {
            message.error("Something went wrong");
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
            render: (_, row) => <span>{getDisplayName(row)}</span>
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, row) => {
                const btnType = row.status === 'active' ? 'primary' : 'default';
                const display = row.status === 'active' ? 'Active' : 'Inactive';
                const visibleIcon = row.visible ? 'eye' : 'eye-invisible';

                return (
                    <>
                        <Tooltip title="Does this teacher still teach this course ?">
                            <Button type={btnType}
                                    onClick={() => this.updateCourseInstructor('status', row)}>{display}
                            </Button>
                        </Tooltip>
                        <Divider type="vertical"/>

                        <Tooltip title="Show this instructor in pages or not">
                            <Button onClick={() => this.updateCourseInstructor('visible', row)}>
                                <Icon type={visibleIcon}/>
                            </Button>
                        </Tooltip>

                        <Divider type="vertical"/>

                        <Popconfirm
                            title="Are you sure delete this instructors?"
                            onConfirm={() => this.removeInstructor(row.id)}
                            onCancel={() => console.log('cancel')}
                            okText="Yes"
                            cancelText="No">
                            <Button>
                                <Icon type="delete"/>
                            </Button>
                        </Popconfirm>

                    </>
                )
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
