import React from "react";

import styles from './Tag.module.css';

export default function Tag(props) {
    const {value} = props;
    return <span className={styles.Tag}>{value}</span>;
}