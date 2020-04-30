import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from '../../../config/axios-config';
import {Button, Divider, message, Modal, Spin, Tooltip} from "antd";
import NewSection from "../../../components/Curriculum/NewSection/NewSection";
import Section from "../../../components/Curriculum/Sections/Sections";
import {httpErrorHandler} from "../../../utils/axios_util";
import {updateSection} from "../../../services/section_service";

// TODO: Lazy loading component

const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
});

class Curriculum extends Component {
    state = {
        newModal: false,
        loading: true,
        orderChange: false,
        sectionList: []
    };

    async componentDidMount() {
        try {
            const {courseData} = this.props;
            const {data} = await axios.get('/api/courses/' + courseData.id + '/sections');
            console.log("Initial", data.sectionList);
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
            sectionList: newSessions,
            orderChange: true
        });
    };

    SortableItem = sortableElement(({value}) => (
        <Section course={this.props.courseData}
                 sections={this.state.sectionList}
                 handleDeleleSection={this.handleDeleteSection}
                 value={value}/>
    ));

    handleSubmitNewSection = async (value) => {
        const newSectionList = [...this.state.sectionList];
        const {courseData} = this.props;
        try {
            value.order = newSectionList.length;
            const {data} = await axios.post('/api/courses/' + courseData.id + '/sections', value);
            newSectionList.push({
                id: data.id,
                title: data.title,
                order: data.order,
                description: data.description,
                modules: []
            });
            message.success("New section has been created");
            this.setState({sectionList: newSectionList, newModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    closeNewSection = () => {
        this.setState({newModal: false});
    };

    openNewSectionModal = () => {
        this.setState({newModal: true});
    };

    handleDeleteSection = (id) => {
        let sectionList = [...this.state.sectionList];
        sectionList = sectionList.filter(section => section.id !== id);
        this.setState({sectionList});
    };

    handleOrderChange = () => {
        const {sectionList} = this.state;
        const key = "update-section-order";
        message.loading({content: "Loading", key});

        sectionList.forEach(async (section, index) => {
            if (section.order && section.order !== index) {
                const patch = [{
                    op: "replace",
                    path: "/order",
                    value: index
                }];

                try {
                    await updateSection(section.id, patch);
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error({content: "Something went wrong", key});
                                return;
                        }
                    })
                }
            }
        });

        message.success({content: "Sections order has been saved !", key});
        this.setState({orderChange: false})
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
                    {
                        this.state.orderChange ?
                            <Tooltip title={"Sections order hasn't been saved ! Click here to update."}>
                                <Button icon={'exclamation-circle'} type={'danger'} ghost
                                        onClick={this.handleOrderChange}>Update order</Button>
                            </Tooltip> : ""
                    }

                </div>
                <Divider style={{margin: '12px 0 24px'}}/>

                <SortableContainer
                    onSortEnd={this.onSortEnd}>
                    {
                        this.state.sectionList.slice(0, 1).map((value, index) => (
                            <this.SortableItem key={`item-${value.id}`} index={index} value={value}
                                               disabled={!value.order}/>
                        ))
                    }
                </SortableContainer>

                <SortableContainer
                    onSortEnd={this.onSortEnd} useDragHandle>
                    {
                        this.state.sectionList.slice(1).map((value, index) => (
                            <this.SortableItem key={`item-${value.id}`} index={index} value={value}
                                               disabled={!value.order}/>
                        ))
                    }
                </SortableContainer>

                <Button icon="plus" type={"primary"}
                        style={{float: "right", margin: "10px"}}
                        onClick={this.openNewSectionModal}>
                    New section
                </Button>

                <Modal title={"Create New Sections"}
                       visible={this.state.newModal}
                       onCancel={this.closeNewSection}
                       footer={null}>
                    <NewSection handleSectionChange={this.handleSubmitNewSection}/>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Curriculum;