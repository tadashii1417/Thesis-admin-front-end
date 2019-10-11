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

const DragHandle = sortableHandle(() => <span><Icon icon={ic_format_line_spacing} className={styles.dragIcon}/></span>);

const SortableItem = sortableElement(({value}) => (
    <div className={styles.module}>
        <DragHandle/>


        {DefaultActivity.map(ele => {
            if (ele.type == value.type) {
                return <Icon key={ele.icon} icon={ele.icon} size={16} style={{color: ele.color, marginRight: "20px"}}/>
            }
        })}
        {value.title}
        <div className={styles.actionArea}>
            <Icon icon={eye} size={13} onClick={()=>(alert('1'))}/>
            <Icon icon={pencil} size={13}/>
            <Icon icon={bin2} size={13}/>
        </div>
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