import React, {Component, Suspense} from "react";
import styles from './Roles.module.css';
import {message, Icon, Divider, Collapse, Modal, Button} from "antd";
import {createRole, deleteRole, getRoles, updateRole} from "../../services/role_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";
import Loading from "../../components/Loading/Loading";

const SpecificRole = React.lazy(() => import("./SpecificRole"));
const NewRoleForm = React.lazy(() => import("./Forms/NewRoleForm"));
const EditRoleForm = React.lazy(() => import("./Forms/EditRoleForm"));
const {Panel} = Collapse;
const {confirm} = Modal;

class RolesPage extends Component {
    state = {
        roles: [],
        newRole: false,
        editRole: false,
        selectedRole: {}
    }

    openNewRoleModal = () => {
        this.setState({newRole: true});
    }

    closeNewRoleModal = () => {
        this.setState({newRole: false});
    }

    closeEditRoleModal = () => {
        this.setState({editRole: false});
    }

    async componentDidMount() {
        try {
            const {data} = await getRoles();
            this.setState({roles: data});
        } catch (e) {
            message.error("Fetch roles failed");
        }
    }

    handleNewRole = async (values) => {
        try {
            const {data} = await createRole(values);
            const updatedRoles = [...this.state.roles];
            updatedRoles.push(data);
            this.setState({roles: updatedRoles});
            message.success("New role has been added");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.ROLE_NAME_ALREADY_EXISTS:
                        message.error("Role name already exist.");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    handleDeleteRole = async (id) => {
        try {
            await deleteRole(id);
            let updatedRoles = [...this.state.roles];
            updatedRoles = updatedRoles.filter(role => role.id !== id);
            this.setState({roles: updatedRoles});
            message.success("Role have been deleted");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.ROLE_NOT_DELETABLE:
                        message.error("This role is not allow to delete");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    showDeleteConfirm = (id, e) => {
        e.stopPropagation();
        confirm({
            title: `Are you sure to delete this role ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.handleDeleteRole(id);
            },
            onCancel() {
                console.log('Cancel')
            },
        });
    };

    handleEditRole = async (patch) => {
        try {
            const {selectedRole: {id}} = this.state;
            const {data} = await updateRole(id, patch);
            const updatedRoles = [...this.state.roles];
            const index = updatedRoles.findIndex(role => role.id === id);
            updatedRoles[index] = data;
            this.setState({roles: updatedRoles});
            message.success("Role has been updated");
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.ROLE_NOT_UPDATEABLE:
                        message.error("This role is not allow to update");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    render() {
        const {roles} = this.state;

        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };

        const genPanelExtraTool = (role) => (
            <div>
                <Icon type="edit"
                      theme="twoTone"
                      onClick={(e) => {
                          e.stopPropagation();
                          this.setState({selectedRole: role, editRole: true})
                      }}/>
                <Divider type="vertical"/>
                <Icon type="delete"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      onClick={(e) => this.showDeleteConfirm(role.id, e)}/>
            </div>
        )

        return (
            <React.Fragment>
                <div className={styles.header}>
                    <h3 className={styles.tabTitle}>Manage Roles</h3>
                </div>
                <Divider/>

                <Collapse bordered={false}
                          expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}>

                    {roles.map(role =>
                        <Panel key={role.id}
                               header={<b>{role.name}</b>}
                               extra={genPanelExtraTool(role)}
                               style={customPanelStyle}>
                            <Suspense fallback={"loading ..."}>
                                <SpecificRole roleId={role.id}/>
                            </Suspense>
                        </Panel>)
                    }

                </Collapse>

                <div className={styles.newRole}>
                    <Button onClick={this.openNewRoleModal} type="primary" icon="plus"> Create new role </Button>
                </div>

                <Modal visible={this.state.newRole}
                       onCancel={this.closeNewRoleModal}
                       footer={null}
                       title={"Create new role"}>
                    <React.Suspense fallback={<Loading/>}>
                        <NewRoleForm handleNewRole={this.handleNewRole}
                                     closeNewRole={this.closeNewRoleModal}/>
                    </React.Suspense>
                </Modal>

                <Modal visible={this.state.editRole}
                       onCancel={this.closeEditRoleModal}
                       footer={null}
                       title={"Edit role"}>
                    <React.Suspense fallback={<Loading/>}>
                        <EditRoleForm handleEditRole={this.handleEditRole}
                                      role={this.state.selectedRole}
                                      closeEditRole={this.closeEditRoleModal}/>
                    </React.Suspense>
                </Modal>
            </React.Fragment>
        );
    }

}

export default RolesPage;
