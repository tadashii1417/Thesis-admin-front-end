import React from "react";
import styles from "./ForumComment.module.css";
import {Avatar} from "antd";
import {defaultAvatar} from "../../constants/dev_constant";
import moment from "moment";
import config from "../../config";
import {EditorContent} from "doodle-editor";

export default function ({response}) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.userInfo}>
                <Avatar src={defaultAvatar} className={styles.avatar}/>
                <div className={styles.authorName}>
                    {response.author.firstName + " " + response.author.lastName}
                </div>
            </div>
            <div className={styles.userComment}>
                <div className={styles.time}>
                    {moment(response.createdAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')}
                </div>
                <div className={styles.comment}>
                    <EditorContent content={response.content}/>
                </div>
            </div>
        </div>
    );
}