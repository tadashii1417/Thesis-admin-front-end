import React, {Component} from "react";
import {Icon} from "react-icons-kit";
import {Dropdown, Button, Menu, Icon as AntIcon, Modal, message, Tooltip} from "antd";
import {sortableContainer, sortableElement, sortableHandle} from "react-sortable-hoc";
import arrayMove from "array-move";
import styles from "./ModuleList.module.css";
import ModulesConfig from "../ModulesConfig";
import {ic_format_line_spacing} from "react-icons-kit/md/ic_format_line_spacing";
import {cog} from "react-icons-kit/iconic/cog";
import {Link} from "react-router-dom";
import EditModule from "../EditModule/EditModule";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createNewModule, deleteModule, updateModule} from "../../../services/module_service";
import NewModule from "../AddModule/AddModule";
import {ModuleType} from "../../../constants/module_constant";
import {createNewQuiz} from "../../../services/quiz_service";
import {createNewArticle} from "../../../services/article_service";
import {createLivestream} from "../../../services/livestream_service";
import {createForum} from "../../../services/forum_service";

const {confirm} = Modal;

const DragHandle = sortableHandle(() => (
    <span style={{cursor: "pointer"}}><Icon icon={ic_format_line_spacing} className={styles.dragIcon}/></span>
));


const SortableContainer = sortableContainer(({children}) => {
    return <div className={styles.moduleContainer}>{children}</div>;
});

export default class extends Component {
    state = {
        modules: this.props.value.modules,
        editModal: false,
        isAddModule: false,
        orderChange: false,
        selectedModule: {}
    };

    closeEditModule = () => {
        this.setState({editModal: false});
    };

    openEditModule = (module) => {
        this.setState({selectedModule: module, editModal: true});
    };

    closeAddModule = () => {
        this.setState({isAddModule: false});
    };

    openAddModule = () => {
        this.setState({isAddModule: true})
    };

    menu = (module) => (
        <Menu>
            <Menu.Item onClick={() => this.openEditModule(module)}>
                <AntIcon type="edit" theme="filled" className={styles.editIcon}/>
                <span>Edit</span>
            </Menu.Item>

            <Menu.Item onClick={() => this.showDeleteConfirm(module.id)}>
                <AntIcon type="delete" theme="filled" className={styles.deleteIcon}/>
                <span>Delete</span>
            </Menu.Item>
        </Menu>
    );

    SortableItem = sortableElement(({value, course}) => {
        const config = ModulesConfig[value.type];
        return <div className={styles.module}>
            <DragHandle/>
            <Icon
                key={config.icon}
                icon={config.icon}
                size={16}
                style={{color: config.color, marginRight: "20px"}}/>

            <Link
                to={{
                    pathname: "/courses/" + course.slug + '/' + value.type + '/' + value.id,
                    state: {
                        courseName: course.name,
                        courseId: course.id
                    }
                }}
                className={styles.moduleTitle}>
                <span>{value.title}</span>
            </Link>

            <div style={{marginLeft: "auto"}}>
                {value.visibility === "private" && <AntIcon type={"eye-invisible" +
                "" +
                ""} style={{padding: '0 10px'}}/>}
                <Dropdown overlay={this.menu(value)}>
                    <Button>
                        <Icon icon={cog} size={13}/>
                    </Button>
                </Dropdown>
            </div>

        </div>
    });

    handleEditModule = async (patch) => {
        const {selectedModule, modules} = this.state;
        let key = "update-module";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateModule(selectedModule.id, patch);
            data.instanceData = selectedModule.instanceData;
            let newModules = [...modules];
            let index = newModules.findIndex(module => module.id === selectedModule.id);
            newModules[index] = data;
            this.setState({modules: newModules, editModal: false});
            message.success({content: "Module has been updated", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Something went wrong", key});
                }
            })
        }
    };

    handleNewModule = async (values) => {
        try {
            const {id} = this.props.value;
            const {modules} = this.state;

            const {data} = await createNewModule(values, modules, id);

            switch (data.type) {
                case ModuleType.QUIZ:
                    await createNewQuiz(data.id);
                    break;
                case ModuleType.ARTICLE:
                    await createNewArticle(data.id);
                    break;
                case ModuleType.LIVESTREAM:
                    await createLivestream(data.id, values.record, values.expectedStartAt);
                    break;
                case ModuleType.FORUM:
                    await createForum(data.id, values.intro);
                    break;
                default:
                    break;
            }

            const newModules = [...this.state.modules];
            newModules.push(data);
            message.success("New module has been created");
            this.setState({modules: newModules, isAddModule: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this module?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteModule(id);

                    let newModules = [...this.state.modules];
                    newModules = newModules.filter(module => module.id !== id);
                    this.setState({modules: newModules});
                    message.success("Module has been deleted")
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error("Something went wrong");
                        }
                    })
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({modules}) => ({
            modules: arrayMove(modules, oldIndex, newIndex),
            orderChange: true
        }));
    };

    handleOrderChange = () => {
        const {modules} = this.state;
        const key = "update-order";
        message.loading({content: "Loading", key});

        modules.forEach(async (module, index) => {
            if (module.order !== index) {
                const patch = [{
                    op: "replace",
                    path: "/order",
                    value: index
                }];

                try {
                    await updateModule(module.id, patch);
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

        message.success({content: "Modules order has been saved !", key});
        this.setState({orderChange: false})
    };

    render() {
        const {course} = this.props;
        return (
            <React.Fragment>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.modules.map((value, index) => (
                        <this.SortableItem
                            key={`item-${value.id}`}
                            index={index}
                            value={value}
                            course={course}
                        />
                    ))}
                </SortableContainer>


                <div className={styles.moduleActions}>
                    {this.state.orderChange ?
                            <Tooltip title={"Modules order hasn't been saved ! Click here to update."}>
                                <AntIcon type={'exclamation-circle'} className={styles.orderAlert}
                                         onClick={this.handleOrderChange}/>
                            </Tooltip> : ""
                    }
                    <Button type={"link"} icon={"plus"}
                            onClick={this.openAddModule}
                            style={{border: '1px solid', margin: '10px'}}>
                        Add new module
                    </Button>
                </div>

                <Modal title={"Add New Module"}
                       visible={this.state.isAddModule}
                       onCancel={this.closeAddModule}
                       bodyStyle={{padding: "12px 24px"}}
                       footer={null}>
                    <NewModule handleNewModule={this.handleNewModule}/>
                </Modal>

                <Modal title={"Edit module"}
                       visible={this.state.editModal}
                       onCancel={this.closeEditModule}
                       footer={null}>
                    <EditModule
                        data={this.state.selectedModule}
                        handleEditModule={this.handleEditModule}
                    />
                </Modal>
            </React.Fragment>

        );
    }
}
