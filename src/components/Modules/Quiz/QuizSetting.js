import React from "react";
import styles from "./Quiz.module.css";
import {Button, Divider} from "antd";

export default function ({quizSettingDto, openSettingModal}) {
    return (
        <div className={styles.quizContainer}>
            <h4>Description</h4>
            <Divider className={styles.divider}/>
            <div>{quizSettingDto.description}</div>

            <br/><br/>

            <h4>Quiz Information</h4>
            <Divider className={styles.divider}/>

            <div className={styles.quizInfo}>
                <div className={styles.fields}>
                    <div>Grading policy</div>
                    <div>Pass threshold</div>
                    <div>Shuffle questions</div>
                    <div>Duration</div>
                    <div>Open day</div>
                    <div>Close day</div>
                    <div>Maximum attempt allowed</div>
                </div>
                <div className={styles.values}>
                    <div>{quizSettingDto.gradingPolicy}</div>
                    <div>{quizSettingDto.passThreshold}</div>
                    <div>{quizSettingDto.shuffleQuestions}</div>
                    <div>{quizSettingDto.duration} seconds</div>
                    <div>{quizSettingDto.openAt}</div>
                    <div>{quizSettingDto.closeAt}</div>
                    <div>{quizSettingDto.numAttempt}</div>
                </div>
            </div>

            <div className={styles.settingButton}>
                <Button type={"primary"}
                        icon={"setting"}
                        onClick={openSettingModal}>
                    Edit setting
                </Button>
            </div>
        </div>

    );
}