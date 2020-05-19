import React from "react";
import styles from './ModuleHeader.module.css';
import CourseBreadcrumb from "../CourseBreadcrumb/CourseBreadcrumb";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../Curriculum/ModulesConfig";
import {Button} from "antd";

export default function ({courseSlug, courseName, moduleTitle, moduleType, moduleDescription, moduleLink, postTitle, openEditModule, showEdit}) {
    return (
        <div className={styles.header}>
            <CourseBreadcrumb
                courseSlug={courseSlug}
                courseName={courseName}
                moduleTitle={moduleTitle}
                moduleLink={moduleLink}
                postTitle={postTitle}
            />

            <div className={styles.heading}>
                <div className={styles.headingText}>
                    <Icon
                        icon={ModulesConfig[moduleType].icon}
                        className={'circle-icon'}
                        style={{color: ModulesConfig[moduleType].color, marginRight: "20px"}}/>
                    {moduleTitle}
                </div>
                {!showEdit && <Button icon={'setting'} onClick={openEditModule}>Edit</Button>}
            </div>
            {moduleDescription && <div className={styles.description}>{moduleDescription}</div>}
        </div>
    );
}