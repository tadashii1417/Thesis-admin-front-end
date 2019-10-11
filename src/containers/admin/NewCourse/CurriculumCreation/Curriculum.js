import React, {Component} from 'react';
import {
    sortableContainer,
    sortableElement,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {Button, Modal} from "antd";
import NewSession from "../../../../components/Curriculum/NewSession/NewSession";
import Session from "../../../../components/Curriculum/Session/Session";
import ModuleList from "../../../../components/Curriculum/ModuleList/ModuleList";

const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
});

class Curriculum extends Component {
    state = {
        newSession: false,
        sessions: [
            {
                key: '1',
                title: 'Introduction',
                modules: [
                    {
                        key: '1-1',
                        type: 'video',
                        title: 'This is lesson 1'
                    },
                    {
                        key: '1-5',
                        type: 'video',
                        title: 'This is lesson 2'
                    },
                    {
                        key: '1-2',
                        type: 'quiz',
                        title: 'First Quiz !'
                    },
                    {
                        key: '1-3',
                        type: 'content',
                        title: 'First Article '
                    }
                ]
            },
            {
                key: '2',
                title: 'Hello world !',
                modules: [
                    {
                        key: '1-1',
                        type: 'resource',
                        title: 'This is lesson 2'
                    }
                ]
            },
            {
                key: '3',
                title: 'Statement !',
                modules: [
                    {
                        key: '1-1',
                        type: 'announcement',
                        title: 'This is lesson 3'
                    },  {
                        key: '1-2',
                        type: 'forum',
                        title: 'Forum chap 3'
                    }
                ]
            },
            {
                key: '4',
                title: 'Conclusion',
                modules: [
                    {
                        key: '1-1',
                        type: 'assignment',
                        title: 'This is lesson 4'
                    }
                ]
            }
        ],
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        let newSessions = [...this.state.sessions];
        newSessions = arrayMove(newSessions, oldIndex, newIndex);
        this.setState({
            sessions: newSessions
        });
    };
    SortableItem = sortableElement(({value}) => (
        <Session sessions={this.state.sessions} value={value.title}>
            <ModuleList modules={value.modules}/>
        </Session>
    ));

    handleSubmitNewSession = () => {
        const newSession = [...this.state.sessions];
        newSession.push({
            key: Math.random(),
            title: "title" + Math.random(),
            description: "hello",
            modules: [
                {title: "new section lession 1"}
            ]
        });
        this.setState({newSession: false, sessions: newSession});
    };

    handleCancelNewSession = () => {
        this.setState({newSession: false});
    };

    showNewSessionModal = () => {
        this.setState({newSession: true});
    };

    render() {
        return (
            <div>
                <SortableContainer
                    onSortEnd={this.onSortEnd} useDragHandle>
                    {
                        this.state.sessions.map((value, index) => (
                            <this.SortableItem key={`item-${value.key}`} index={index} value={value}/>
                        ))
                    }
                </SortableContainer>
                <Button icon="plus" type={"primary"} style={{float: "right", margin: "10px"}}
                        onClick={this.showNewSessionModal}>New
                </Button>
                <Modal title={"Create New Session"}
                       visible={this.state.newSession}
                       onOk={this.handleSubmitNewSession}
                       onCancel={this.handleCancelNewSession}>
                    <NewSession/>
                </Modal>
            </div>
        );
    }
}

export default Curriculum;