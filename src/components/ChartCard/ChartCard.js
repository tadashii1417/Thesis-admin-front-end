import React from "react";
import styles from './ChartCard.module.css'
import {Divider, Icon, Tooltip} from "antd";

export default function (props) {
    const {title, totalNumber, subTitle, subNumber, icon} = props;

    return (
        <div className={styles.card}>
            {title}
            <Tooltip title={title} className={styles.icon}>
                <Icon type="info-circle-o"/>
            </Tooltip>
            <div className={styles.totalNumber}>
                <span className={styles.mainIcon}>{icon}</span>
                {totalNumber}
            </div>
            {props.children}
            <Divider className={styles.divider}/>
            <div>
                {subTitle} <span className={styles.subNumber}>{subNumber}</span>
            </div>
        </div>
    )

}