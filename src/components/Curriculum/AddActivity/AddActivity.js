import React from "react";
import {Icon} from 'react-icons-kit';
import Activities from '../ModulesConfig';
import styles from './AddActivity.module.css';

export default function (props) {
    return (
        Activities.map(action => (
            <label htmlFor={action.type} key={action.type}>
                <div className={styles.option}>
                    <div>
                        <Icon icon={action.icon} size={16} style={{color: action.color, marginRight: "20px"}}/>
                        {action.title}
                    </div>
                    <input id={action.type} type={"radio"} name={props.name} value={action.type}/>
                </div>
            </label>
        ))
    );
}