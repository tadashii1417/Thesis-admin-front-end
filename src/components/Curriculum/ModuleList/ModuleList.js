import React, {Component} from "react";
import {Icon} from "react-icons-kit";
import {Dropdown, Button, Menu, Icon as AntIcon} from "antd";
import {sortableContainer, sortableElement, sortableHandle} from "react-sortable-hoc";
import arrayMove from "array-move";
import styles from "./ModuleList.module.css";
import ModulesConfig from "../ModulesConfig";
import {ic_format_line_spacing} from "react-icons-kit/md/ic_format_line_spacing";
import {pencil} from "react-icons-kit/icomoon/pencil";
import {eye} from "react-icons-kit/icomoon/eye";
import {bin2} from "react-icons-kit/icomoon/bin2";
import {cog} from "react-icons-kit/iconic/cog";
import {Link} from "react-router-dom";

const menu = type => (
    <Menu>
        <Menu.Item>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.alipay.com/">
                <AntIcon type="eye" theme="filled" className={styles.actionIcon}/>
                <span>Visibility</span>
            </a>
        </Menu.Item>
        <Menu.Item>
            <Link to={"/course/edit/" + type}>
                <AntIcon type="edit" theme="filled" className={styles.actionIcon}/>
                <span>Edit</span>
            </Link>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                <AntIcon type="delete" theme="filled" className={styles.actionIcon}/>
                <span>Delete</span>
            </a>
        </Menu.Item>
    </Menu>
);

const DragHandle = sortableHandle(() => (
    <span>
    <Icon icon={ic_format_line_spacing} className={styles.dragIcon}/>
  </span>
));

const SortableItem = sortableElement(({value, course}) => (
    <div className={styles.module}>
        <DragHandle/>
        {ModulesConfig.map(ele => {
            if (ele.type === value.type) {
                return (
                    <React.Fragment key={ele.icon}>
                        <Icon
                            key={ele.icon}
                            icon={ele.icon}
                            size={16}
                            style={{color: ele.color, marginRight: "20px"}}/>

                        <Link to={{
                            pathname: "/courses/" + course.slug + '/' + value.id,
                            search: "?course="+ course.name
                        }}>
                            {value.title}
                        </Link>

                        <div style={{marginLeft: "auto"}}>
                            <Dropdown overlay={menu(value.type)}>
                                <Button>
                                    <Icon icon={cog} size={13}/>
                                </Button>
                            </Dropdown>
                        </div>

                        <div className={styles.actionArea}>
                            <Icon icon={eye} size={13}/>
                            <Link
                                to={"/course/edit/" + value.type}
                                style={{color: "#5c5c5c"}}
                            >
                                <Icon icon={pencil} size={13}/>
                            </Link>
                            <Icon icon={bin2} size={13}/>
                        </div>
                    </React.Fragment>
                );
            }
            return "";
        })}
    </div>
));

const SortableContainer = sortableContainer(({children}) => {
    return <div className={styles.moduleContainer}>{children}</div>;
});

export default class extends Component {
    state = {items: this.props.modules};
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };

    render() {
        const {course} = this.props;
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((value, index) => (
                    <SortableItem
                        key={`item-${value.id}`}
                        index={index}
                        value={value}
                        course={course}
                    />
                ))}
            </SortableContainer>
        );
    }
}
