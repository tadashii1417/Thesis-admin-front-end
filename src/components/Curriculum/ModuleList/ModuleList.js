import React, {Component} from "react";
import {Icon} from "react-icons-kit";
import {Dropdown, Button, Menu, Icon as AntIcon, Modal, message} from "antd";
import {sortableContainer, sortableElement, sortableHandle} from "react-sortable-hoc";
import arrayMove from "array-move";
import styles from "./ModuleList.module.css";
import ModulesConfig from "../ModulesConfig";
import {ic_format_line_spacing} from "react-icons-kit/md/ic_format_line_spacing";
import {cog} from "react-icons-kit/iconic/cog";
import {Link} from "react-router-dom";
import EditModule from "../EditModule/EditModule";
import {httpErrorHandler} from "../../../utils/axios_util";
import {deleteModule, updateModule} from "../../../services/module_service";

const {confirm} = Modal;

const DragHandle = sortableHandle(() => (
    <span style={{cursor: "pointer"}}><Icon icon={ic_format_line_spacing} className={styles.dragIcon}/></span>
));


const SortableContainer = sortableContainer(({children}) => {
    return <div className={styles.moduleContainer}>{children}</div>;
});

export default class extends Component {
    state = {
        modules: this.props.modules,
        editModal: false,
        selectedModule: {}
    };

    closeEditModule = () => {
        this.setState({editModal: false});
    };

    openEditModule = (module) => {
        console.log('click');
        this.setState({selectedModule: module, editModal: true});
    };

    // TODO: add previewable, visibility icon to FE.
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
                    search: "?course=" + course.name
                }}
                className={styles.moduleTitle}>
                <span>{value.title}</span>
            </Link>

            <div style={{marginLeft: "auto"}}>
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
            modules: arrayMove(modules, oldIndex, newIndex)
        }));
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
