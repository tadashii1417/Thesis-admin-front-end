import React from "react";
import styles from "./AuthContainer.module.css";

export default function ({children}) {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}