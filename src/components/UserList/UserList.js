import React, {Component} from "react";
import {Divider, Table, Tag, Input, message, Avatar, Modal, Button, Radio} from "antd";
import styles from "./UserList.module.css";
import {Link} from "react-router-dom";
import {getUsers} from "../../services/user_service";
import {DEFAULT_SMALL_AVATAR} from "../../constants/dev_constant";
import Loading from "../Loading/Loading";
import {getDisplayName} from "../../utils/string_util";
import {addRoleToUser, getRoles} from "../../services/role_service";
import {httpErrorHandler} from "../../utils/axios_util";

const {Search} = Input;

class UserList extends Component {
    state = {
        loading: true,
        users: [],
        addRole: false,
        selectedRole: null,
        selectedUser: null,
        roles: [],
        pagination: {
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '30', '50']
        }
    }

    async componentDidMount() {
        await this.fetchUser();
        const {data} = await getRoles();
        this.setState({roles: data});
    }

    setUser = (userId) => {
        this.setState({selectedUser: userId, addRole: true});
    }

    setSelectedRole = (e) => {
        this.setState({selectedRole: e.target.value});
    }

    handleAddRole = async () => {
        const {selectedUser, selectedRole} = this.state;
        if (!selectedRole) {
            message.error("Please select a role");
        }
        try {
            await addRoleToUser(selectedUser, selectedRole);
            const role = this.state.roles.findIndex(role => role.id === selectedRole);
            const updatedUsers = [...this.state.users];
            const index = updatedUsers.findIndex(user => user.id === selectedUser);
            updatedUsers[index].roles.push(this.state.roles[role]);
            this.setState({users: updatedUsers, addRole: false});
            message.success("New role has been added to user");
        } catch (e) {
            message.error("Add role failed.");
        }
    }

    columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <Avatar src={(text != null && text["50x50"]) || DEFAULT_SMALL_AVATAR}
                                    size={50}
                                    alt={"Author's avatar"}/>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Full name',
            key: 'fullname',
            render: (_, row) => getDisplayName(row)
        },
        {
            title: 'Roles',
            key: 'roles',
            dataIndex: 'roles',
            render: role => (
                <span>
        {role.map(tag => {
            let color;
            switch (tag.name) {
                case 'admin':
                    color = 'volcano';
                    break;
                case 'instructor':
                    color = 'geekblue';
                    break;
                default:
                    color = 'green';
            }
            return (
                <Tag color={color} key={tag.name}>
                    {tag.name.toUpperCase()}
                </Tag>
            );
        })}
      </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
        <Button type="link" onClick={() => this.setUser(record.id)}>Add Role</Button>
        <Divider type="vertical"/>
        <Link to={'/'}>Delete</Link>
      </span>
            ),
        },
    ];

    fetchUser = async () => {
        this.setState({loading: true});
        try {
            const {data} = await getUsers(this.state.pagination.defaultPageSize);
            const pagination = {...this.state.pagination};
            pagination.total = data.totalItemCount;
            this.setState({
                loading: false,
                users: data.items,
                pagination
            });
        } catch (e) {
            message.error("Fetch users failed");
        }
    }

    handleTableChange = ({current, pageSize}) => {
        const pager = {...this.state.pagination};
        pager.current = current;
        pager.pageSize = pageSize;
        this.setState({pagination: pager});

        if (pager.pageSize !== pageSize) current = 1;
        this.fetchUser({page: current, pageSize: pageSize})
    };

    render() {
        if (this.state.loading) return <Loading/>;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return <>
            <div className={styles.header}>
                <h3 className={styles.tabTitle}>Manage Users</h3>
                <Search
                    className={styles.searchBox}
                    placeholder="input search text"
                    enterButton
                    onSearch={value => console.log(value)}
                />
            </div>

            <Divider/>

            <Table columns={this.columns}
                   dataSource={this.state.users}
                   pagination={this.state.pagination}
                   onChange={this.handleTableChange}
                   loading={this.state.loading}
                   rowKey={'id'}/>

            <Modal visible={this.state.addRole}
                   onCancel={() => this.setState({addRole: false})}
                   footer={null}>
                <div>
                    <b>
                        Please select role to add :
                    </b>
                </div>
                <br/>
                <Radio.Group onChange={this.setSelectedRole} value={this.state.selectedRole}>
                    {this.state.roles.map(role =>
                        <Radio style={radioStyle} value={role.id} key={role.id}>
                            {role.name}
                        </Radio>)
                    }
                </Radio.Group>
                <br/>
                <br/>
                <Button type="primary" onClick={this.handleAddRole}>Add role</Button>
            </Modal>
        </>
    }
}

export default UserList;
