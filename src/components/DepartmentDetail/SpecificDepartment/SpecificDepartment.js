import React, {Component} from "react";
import {Icon, message, AutoComplete, Button, Alert, Modal, Card, Avatar, Row, Col} from "antd";
import {
    addUserToDepartment,
    getSpecificDepartment,
    removeUserFromDepartment
} from "../../../services/department_service";
import styles from './SpecificDepartment.module.css';
import {getUser, searchUser} from "../../../services/user_service";
import Loading from "../../Loading/Loading";
import {DEFAULT_SMALL_AVATAR} from "../../../constants/dev_constant";
import {getDisplayName} from "../../../utils/string_util";

const {Option} = AutoComplete;
const {Meta} = Card;
const {confirm} = Modal;

class SpecificDepartment extends Component {
    state = {
        loading: true,
        department: {},
        searchLoading: false,
        searchResult: [],
        selectedUser: null
    }

    async componentDidMount() {
        try {
            const {id} = this.props;
            const {data} = await getSpecificDepartment(id);
            this.setState({loading: false, department: data});
        } catch (e) {
            message.error("Something went wrong");
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

    handleAddStaff = async () => {
        try {
            await addUserToDepartment(this.state.department.id, this.state.selectedUser);
            const {data} = await getUser(this.state.selectedUser);
            const updatedDepartment = {...this.state.department};
            updatedDepartment.staffs = [...this.state.department.staffs];
            updatedDepartment.staffs.push(data);
            this.setState({department: updatedDepartment});
            console.log(updatedDepartment);
            message.success("New user has been added to department");
        } catch (e) {
            message.error("Something went wrong");
        }
        console.log(this.state.selectedUser);
    }

    handleRemoveStaff = async (id) => {
        try {
            await removeUserFromDepartment(this.state.department.id, id);
            const updatedDepartment = {...this.state.department};
            updatedDepartment.staffs = [...this.state.department.staffs];
            updatedDepartment.staffs = updatedDepartment.staffs.filter(d => d.id !== id);
            this.setState({department: updatedDepartment});
            message.success("Remove successful");
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    showDeleteConfirm = (id, e) => {
        e.stopPropagation();
        confirm({
            title: `Are you sure to remove this user ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.handleRemoveStaff(id);
            },
            onCancel() {
            },
        });
    };

    render() {
        const {loading, searchLoading, searchResult, department: {staffs}} = this.state;
        if (loading) return <Loading/>;


        const children = searchResult.map(
            user => (
                <Option key={user.id}
                        value={`${user.id}`}
                        display={getDisplayName(user)}>
                    <Icon type={"user"} style={{marginRight: '5px'}}/>
                    {user.email}
                </Option>)
        );

        let staffsView = "";

        if (staffs.length > 0) {
            staffsView = (
                <Row gutter={8}>
                    {staffs.map(staff => {
                        let avatar = DEFAULT_SMALL_AVATAR;
                        if (staff.avatar) {
                            avatar = staff.avatar['50x50'];
                        }

                        return (
                            <Col sm={24} md={12} lg={8} key={staff.id}>
                                <Card style={{marginTop: 16}}>
                                    <Meta
                                        avatar={<Avatar src={avatar}/>}
                                        title={<div className={styles.staffHeading}>
                                            {getDisplayName(staff)}
                                            <Icon type="delete"
                                                  onClick={(e) => this.showDeleteConfirm(staff.id, e)}/>
                                        </div>}
                                        description={staff.email}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            );
        }

        return (
            <div>
                <div className={styles.searchBox}>
                    {searchLoading && <Icon type="loading" className={styles.spin}/>}

                    <AutoComplete onSearch={this.handleSearch}
                                  placeholder="search user here ..."
                                  optionLabelProp={'display'}
                                  onSelect={this.handleSelectOption}>
                        {children}
                    </AutoComplete>

                    <Button icon={"plus"} onClick={this.handleAddStaff}> Add </Button>
                </div>

                <div>
                    {staffsView}
                </div>
            </div>
        );
    }
}

export default SpecificDepartment;
