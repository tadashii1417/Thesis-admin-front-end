import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from '../../../axios-config';
import {Button, Divider, message, Modal, Spin} from "antd";
import NewSession from "../../../components/Curriculum/NewSection/NewSection";
import Session from "../../../components/Curriculum/Sections/Sections";
import ModuleList from "../../../components/Curriculum/ModuleList/ModuleList";
import {httpErrorHandler} from "../../../utils/axios_util";

const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
});

class Curriculum extends Component {
    state = {
        openModal: false,
        loading: true,
        sectionList: []
    };

    async componentDidMount() {
        try {
            const {courseData} = this.props;
            const {data} = await axios.get('/api/courses/' + courseData.id + '/sections');
            this.setState({sectionList: data.sectionList, loading: false})
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Fetch course curriculum fail")
                }
            })
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let newSessions = [...this.state.sectionList];
        newSessions = arrayMove(newSessions, oldIndex, newIndex);
        this.setState({
            sectionList: newSessions
        });
    };

    SortableItem = sortableElement(({value}) => (
        <Session sessions={this.state.sectionList} value={value.title}>
            <ModuleList modules={value.modules}/>
        </Session>
    ));

    handleSubmitNewSession = async (value) => {
        const newSectionList = [...this.state.sectionList];
        const {courseData} = this.props;
        try {
            const {data} = await axios.post('/api/courses/' + courseData.id + '/sections', value);
            newSectionList.push({
                id: data.id,
                title: data.title,
                order: data.order,
                description: data.description,
                modules: []
            });
            message.success("New section has been created");
            this.setState({sectionList: newSectionList, openModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    handleCancelNewSession = () => {
        this.setState({openModal: false});
    };

    showNewSessionModal = () => {
        this.setState({openModal: true});
    };

    render() {
        const {loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        return (
            <React.Fragment>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h4>Course curriculum</h4>
                    <Button type={'primary'} icon={'save'}>Save</Button>
                </div>
                <Divider style={{margin: '12px 0 24px'}}/>

                <SortableContainer
                    onSortEnd={this.onSortEnd} useDragHandle>
                    {
                        this.state.sectionList.map((value, index) => (
                            <this.SortableItem key={`item-${value.id}`} index={index} value={value}/>
                        ))
                    }
                </SortableContainer>

                <Button icon="plus" type={"primary"} style={{float: "right", margin: "10px"}}
                        onClick={this.showNewSessionModal}>New session
                </Button>

                <Modal title={"Create New Sections"}
                       visible={this.state.openModal}
                       onCancel={this.handleCancelNewSession}
                       footer={null}>
                    <NewSession handleSectionChange={this.handleSubmitNewSession}/>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Curriculum;