import React, {Component, Suspense} from "react";
import {Button, Card, Col, Icon, message, Modal, Row} from "antd";
import {addPermissionToRole, deletePermissionFromRole, getSpecificRole} from "../../services/role_service";
import styles from "./Roles.module.css";
import Loading from "../../components/Loading/Loading";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";

const PermissionList = React.lazy(() => import("../../components/PermissionList/PermissionList"));

const {Meta} = Card;
const {confirm} = Modal;

class SpecificRole extends Component {
    state = {
        loading: true,
        addPermission: false,
        data: {}
    }

    async componentDidMount() {
        try {
            const {data} = await getSpecificRole(this.props.roleId);
            this.setState({data: data, loading: false});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    openAddPermissionModal = () => {
        this.setState({addPermission: true});
    }

    closeAddPermissionModal = () => {
        this.setState({addPermission: false});
    }

    handleAddPermission = async (permission) => {
        if (!permission) {
            return;
        }

        try {
            await addPermissionToRole(this.state.data.id, permission.id);
            const updatedRole = {...this.state.data};
            updatedRole.permissions.push(permission);
            this.setState({data: updatedRole});
            message.success("New permission have been added.");
            this.closeAddPermissionModal();
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.ROLE_NOT_UPDATEABLE:
                        message.error("This role is not allow to update");
                        break;
                    case ServerErrors.ROLE_NAME_ALREADY_EXISTS:
                        message.error("This role already have this permission.");
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
                this.handleDeletePermission(id);
            },
            onCancel() {
                console.log('Cancel')
            },
        });
    };

    handleDeletePermission = async (permissionId) => {
        try {
            await deletePermissionFromRole(this.state.data.id, permissionId);
            const updateRole = {...this.state.data};
            updateRole.permissions = [...updateRole.permissions];
            updateRole.permissions = updateRole.permissions.filter(p => p.id !== permissionId);
            this.setState({data: updateRole});
            message.success("Permission has been deleted");
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
        const {loading, data} = this.state;
        if (loading) return <Loading/>;

        return (
            <div>
                <div><i>{data.description}</i></div>

                <div className={styles.addPermission}>
                    <Button icon="plus" onClick={this.openAddPermissionModal}>Add permission</Button>
                </div>

                <Row gutter={8}>
                    {data.permissions.map(permission => {
                        return (
                            <Col sm={24} md={12} lg={8} key={permission.id}>
                                <Card style={{marginTop: 16}}>
                                    <Meta
                                        title={<div className={styles.permissionHeading}>
                                            {permission.name}
                                            <Icon type="delete"
                                                  onClick={(e) => this.showDeleteConfirm(permission.id, e)}/>
                                        </div>}
                                        description={permission.description}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                <Modal title={'Permission List'}
                       visible={this.state.addPermission}
                       width={'80%'}
                       footer={null}
                       onCancel={this.closeAddPermissionModal}>
                    <Suspense fallback={"loading ..."}>
                        <PermissionList onCancel={this.closeAddPermissionModal}
                                        handleAddPermission={this.handleAddPermission}/>
                    </Suspense>
                </Modal>
            </div>
        );
    }
}

export default SpecificRole;
