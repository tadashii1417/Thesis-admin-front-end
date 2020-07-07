import React, {Component} from "react";
import {Alert, Button, Divider, Icon, message, Modal} from "antd";
import {createNewSemester, deleteSemester, getAllSemesters, updateSemester} from "../../services/semester_service";
import styles from './Semester.module.css';
import Loading from "../Loading/Loading";

const EditSemesterForm = React.lazy(() => import("./EditSemesterForm"));
const SemesterForm = React.lazy(() => import("./SemesterForm"));

class SemesterDetail extends Component {
    state = {
        loading: true,
        semesters: [],
        newSemester: false,
        editSemester: false,
        selectedSemester: null
    }

    openNewSemester = () => {
        this.setState({newSemester: true})
    };
    closeNewSemester = () => {
        this.setState({newSemester: false})
    };

    closeEditSemester = () => {
        this.setState({editSemester: false})
    };

    async componentDidMount() {
        try {
            const {data} = await getAllSemesters();
            this.setState({semesters: data, loading: false});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    handleNewSemester = async (values) => {
        try {
            const {data} = await createNewSemester(values);
            const updatedSemesters = [...this.state.semesters];
            updatedSemesters.push(data);
            this.setState({semesters: updatedSemesters});
            message.success("New semester has been added !");
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    handleDeleteSemester = async (id) => {
        try {
            await deleteSemester(id);
            let updatedSemester = [...this.state.semesters];
            updatedSemester = updatedSemester.filter(s => s.id !== id);
            this.setState({semesters: updatedSemester});
            message.success("Semester has been deleted");
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    handleEditSemester = async (patch) => {
        try {
            const {id} = this.state.selectedSemester;
            const {data} = await updateSemester(id, patch);
            const updatedSemesters = [...this.state.semesters];
            const index = updatedSemesters.findIndex(s => s.id === id);
            updatedSemesters[index] = data;
            this.setState({semesters: updatedSemesters});
            message.success("Semester has been updated");
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    render() {
        const {loading, semesters} = this.state;
        if (loading) return <Loading/>;
        let displaySemesters = <Alert
            message="There is no semesters"
            description="Please create new semester to manage."
            type="info"
            showIcon
        />;

        if (semesters.length > 0) {
            displaySemesters = <div>
                {semesters.map(m => <div className={styles.semester} key={m.id}>
                    {m.name}
                    <div>
                        <Icon type={"edit"} theme="twoTone"
                              onClick={() => this.setState({editSemester: true, selectedSemester: m})}/>
                        <Divider type="vertical"/>
                        <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96"
                              onClick={() => this.handleDeleteSemester(m.id)}
                        />
                    </div>
                </div>)}
            </div>;
        }

        return <>
            {displaySemesters}
            <div className={styles.newSemester}>
                <Button onClick={this.openNewSemester}>New semester</Button>
            </div>

            <Modal visible={this.state.newSemester}
                   footer={null}
                   onCancel={this.closeNewSemester}
                   title="New semester !">
                <React.Suspense fallback={"loading ..."}>
                    <SemesterForm handleNewSemester={this.handleNewSemester}
                                  closeNewSemester={this.closeNewSemester}/>
                </React.Suspense>
            </Modal>

            <Modal visible={this.state.editSemester}
                   footer={null}
                   onCancel={this.closeEditSemester}
                   title="Edit semester !">
                <React.Suspense fallback={"loading ..."}>
                    <EditSemesterForm handleEditSemester={this.handleEditSemester}
                                      semester={this.state.selectedSemester}
                                      closeEditSemester={this.closeEditSemester}/>
                </React.Suspense>
            </Modal>
        </>;
    }
}

export default SemesterDetail;
