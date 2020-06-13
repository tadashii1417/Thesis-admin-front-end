import React, {Component, Suspense} from "react";
import {Alert, Button, Collapse, Divider, Icon, message, Modal} from "antd";
import styles from './DepartmentDetail.module.css';
import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    updateDepartment
} from "../../services/department_service";
import NewDepartmentForm from "./DepartmentForm/NewDepartmentForm";
import EditDepartmentForm from "./DepartmentForm/EditDepartmentForm";
import Loading from "../Loading/Loading";

const SpecificDepartment = React.lazy(() => import("./SpecificDepartment/SpecificDepartment"));
const {Panel} = Collapse;
const {confirm} = Modal;

class DepartmentDetail extends Component {
    state = {
        loading: true,
        departments: [],
        newDepartment: false,
        editDepartment: false,
        selectedDepartment: null
    }

    async componentDidMount() {
        try {
            const {data} = await getAllDepartments();
            this.setState({loading: false});
            this.setState({departments: data, loading: false});
        } catch (e) {
            message.error("Fetch departments failed");
        }
    }

    openNewDepartment = () => {
        this.setState({newDepartment: true});
    }

    closeNewDepartment = () => {
        this.setState({newDepartment: false});
    }

    closeEditDepartment = () => {
        this.setState({editDepartment: false});
    }

    handleNewDepartment = async (values) => {
        try {
            const {data} = await createDepartment(values);
            const updatedDepartments = [...this.state.departments];
            updatedDepartments.push(data);
            this.setState({departments: updatedDepartments});
            message.success("New department has been created.");
        } catch (e) {
            message.error("Create new department failed");
        }
    }

    handleDeleteDepartment = async (id) => {
        try {
            await deleteDepartment(id);
            let updatedDepartments = [...this.state.departments];
            updatedDepartments = updatedDepartments.filter(d => d.id !== id);
            this.setState({departments: updatedDepartments});
            message.success("Delete successful");
        } catch (e) {
            message.error("Delete department failed");
        }
    }


    handleEditDepartment = async (patch) => {
        try {
            const {id} = this.state.selectedDepartment;
            const {data} = await updateDepartment(id, patch);
            const updatedDepartments = [...this.state.departments];
            const index = updatedDepartments.findIndex(s => s.id === id);
            updatedDepartments[index] = data;
            this.setState({departments: updatedDepartments});
            message.success("Department has been updated");
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    showDeleteConfirm = (id, e) => {
        e.stopPropagation();
        confirm({
            title: `Are you sure to delete this department ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.handleDeleteDepartment(id);
            },
            onCancel() {
                console.log('Cancel')
            },
        });
    };

    render() {
        const {loading, departments} = this.state;
        if (loading) return <Loading/>;

        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };

        const genPanelExtraTool = (department) => (
            <div>
                <Icon type="edit"
                      theme="twoTone"
                      onClick={(e) => {
                          e.stopPropagation();
                          this.setState({selectedDepartment: department, editDepartment: true})
                      }}/>
                <Divider type="vertical"/>
                <Icon type="delete"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      onClick={(e) => this.showDeleteConfirm(department.id, e)}/>
            </div>
        )

        let displayDepartments = <Alert
            message="There is no departments"
            description="Please create new department to manage."
            type="info"
            showIcon
        />;

        if (departments.length > 0) {
            displayDepartments =
                <Collapse bordered={false}
                          expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}>
                    {
                        departments.map(p =>
                            <Panel key={p.id}
                                   header={<b>{p.name}</b>}
                                   extra={genPanelExtraTool(p)}
                                   style={customPanelStyle}>
                                <Suspense fallback={"loading ..."}>
                                    <SpecificDepartment id={p.id}/>
                                </Suspense>
                            </Panel>)
                    }
                </Collapse>
        }

        return (
            <>
                {displayDepartments}
                <div className={styles.newDepartment}>
                    <Button onClick={this.openNewDepartment}>New Department</Button>
                </div>

                <Modal visible={this.state.newDepartment}
                       footer={null}
                       onCancel={this.closeNewDepartment}
                       title="New Department">
                    <NewDepartmentForm handleNewDepartment={this.handleNewDepartment}
                                       closeNewDepartment={this.closeNewDepartment}/>
                </Modal>

                <Modal visible={this.state.editDepartment}
                       footer={null}
                       onCancel={this.closeEditDepartment}
                       title="Edit Department">
                    <EditDepartmentForm department={this.state.selectedDepartment}
                                        handleEditDepartment={this.handleEditDepartment}
                                        closeEditDepartment={this.closeEditDepartment}
                    />
                </Modal>
            </>
        );
    }
}

export default DepartmentDetail;
