import React from "react";
import styles from "./ForumComment.module.css";
import {Avatar} from "antd";
import {defaultAvatar} from "../../constants/dev_constant";
import {EditorContent} from "lerna-rte";
import {formatCalendarTime} from "../../utils/date_util";

export default function ({response}) {
    console.log(response);
    return (
        <div className={styles.commentContainer}>
            <div className={styles.userInfo}>
                <Avatar src={response.author.avatar ? response.author.avatar['50x50'] : defaultAvatar} size={45}/>
            </div>

            <div className={styles.userComment}>
                <div className={styles.time}>
                    <div className={styles.authorName}>
                        {response.author.firstName}
                    </div>
                    <span className={styles.createAt}>
                    {formatCalendarTime(response.createdAt)}
                    </span>
                </div>

                <div className={styles.comment}>
                    <EditorContent content={response.content}/>
                </div>
            </div>
            <p className={styles.clearfix}/>
        </div>
    );
}
