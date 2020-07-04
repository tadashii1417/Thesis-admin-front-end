import React from "react";
import styles from "./ForumQuestion.module.css";
import {Avatar, Icon} from "antd";
import {defaultAvatar} from "../../constants/dev_constant";
import {EditorContent} from "lerna-rte";
import {formatCalendarTime} from "../../utils/date_util";

export default function ({response, answerCount}) {
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
                        {formatCalendarTime(response.createAt)}
                    </span>
                </div>

                <div className={styles.comment}>
                    <EditorContent content={response.content}/>
                </div>

                <div style={{color: 'red'}}>
                    <br/><br/>
                    <Icon type="highlight" style={{marginRight: '10px'}}/>
                    {answerCount} answers.
                </div>
            </div>
            <p className={styles.clearfix}/>
        </div>
    );
}
