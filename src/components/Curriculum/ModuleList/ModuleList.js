import React, {Component} from "react";
import {Icon} from 'react-icons-kit';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styles from './ModuleList.module.css';
import DefaultActivity from '../DefaultActivity';
import {ic_format_line_spacing} from 'react-icons-kit/md/ic_format_line_spacing'
import {pencil} from 'react-icons-kit/icomoon/pencil';
import {eye} from 'react-icons-kit/icomoon/eye';
import {bin2} from 'react-icons-kit/icomoon/bin2';
import {Link} from "react-router-dom";

const DragHandle = sortableHandle(() => <span><Icon icon={ic_format_line_spacing} className={styles.dragIcon}/></span>);

const SortableItem = sortableElement(({value}) => (
    <div className={styles.module}>
        <DragHandle/>
        {DefaultActivity.map(ele => {
            if (ele.type === value.type) {
                return (
                    <React.Fragment key={ele.icon}>
                        <Icon key={ele.icon} icon={ele.icon} size={16} style={{color: ele.color, marginRight: "20px"}}/>
                        <Link to={"course/"+value.type} style={{color: '#101ee6'}}>
                            {value.title}
                        </Link>

                        <div className={styles.actionArea}>
                            <Icon icon={eye} size={13}/>
                            <Link to={"/course/edit/" + value.type} style={{color: '#5c5c5c'}}><Icon icon={pencil}
                                                                                                     size={13}/></Link>
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
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((value, index) => (
                    <SortableItem key={`item-${value.title}`} index={index} value={value}/>
                ))}
            </SortableContainer>
        );
    }
}