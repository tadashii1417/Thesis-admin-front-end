import React from "react";
import styles from './ModuleHeader.module.css';
import CourseBreadcrumb from "../CourseBreadcrumb/CourseBreadcrumb";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../Curriculum/ModulesConfig";

export default function ({courseSlug, courseName, moduleTitle, moduleType, }) {
    return (
        <div className={styles.header}>
            <CourseBreadcrumb courseSlug={courseSlug} courseName={courseName} moduleTitle={moduleTitle}/>

            <div className={styles.heading}>
                <Icon
                    icon={ModulesConfig[moduleType].icon}
                    className={'circle-icon'}
                    style={{color: ModulesConfig[moduleType].color, marginRight: "20px"}}
                />
                {moduleTitle}
            </div>
        </div>
    );
}