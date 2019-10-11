import React from "react";
import styles from '../Categories.module.css';
import {Input, Tooltip, TreeSelect} from "antd";

const {TextArea} = Input;

const form = (props) => {
    return (
        <div>
            <div className={styles.formItem}>
                <label>Name</label>
                <Tooltip title="The name is how it appears on your site.">
                    <Input></Input>
                </Tooltip>

            </div>

            <div className={styles.formItem}>
                <label>Slug</label>
                <Tooltip title="The “slug” is the URL-friendly version of the name. It is usually all lowercase and
                            contains only letters, numbers, and hyphens.">
                    <Input></Input>
                </Tooltip>
            </div>
            <div className={styles.formItem}>
                <label>Parent Node</label>
                <TreeSelect
                    style={{width: '100%'}}
                    treeData={props.treeData}
                    placeholder="Parent"
                    treeDefaultExpandAll
                />
            </div>
            <div className={styles.formItem}>
                <label>Description</label>
                <TextArea/>
            </div>
        </div>
    );
}

export default form;