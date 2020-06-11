import React, {Component} from "react";
import {Icon, message, AutoComplete, Button, Alert} from "antd";
import {addUserToDepartment, getSpecificDepartment} from "../../../services/department_service";
import styles from './SpecificDepartment.module.css';
import {searchUser} from "../../../services/user_service";
import Loading from "../../Loading/Loading";

const {Option} = AutoComplete;

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

    handleAddStaff = () => {
        try {
            const {data} = addUserToDepartment(this.state.department.id, this.state.selectedUser);
            console.log(data);
        } catch (e) {
            message.error("Something went wrong");
        }
        console.log(this.state.selectedUser);
    }

    render() {
        const {loading, searchLoading, searchResult, department: {staffs}} = this.state;
        if (loading) return <Loading/>;

        const children = searchResult.map(
            user => (
                <Option key={user.id}
                        value={`${user.id}`}
                        display={user.firstName + " " + user.lastName}>
                    <Icon type={"user"}/>
                    {user.email}
                </Option>)
        );

        let staffsView = <Alert
            message="There is no staff."
            type="info"
            showIcon
        />;

        if (staffs.length > 0) {
            staffsView = <div>
                hi
            </div>;
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
