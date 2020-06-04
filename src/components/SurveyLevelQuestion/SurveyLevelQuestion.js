import React from "react";
import {TextLevelMapping} from "../../constants/survey_constant";
import {Divider, Icon, Radio} from "antd";
import styles from "./SurveyLevelQuestions.module.css";

export default function ({question, index, handleDelete, setSelectedQuestion, openEditModal}) {
    return (
        <div>
            <div className={styles.questionContainer}>
                <div className={styles.question}>
                    <Icon type={"edit"} theme="twoTone"
                          onClick={() => {
                              setSelectedQuestion(question);
                              openEditModal();
                          }}/>

                    <Divider type="vertical"/>

                    <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96"
                          onClick={() => handleDelete(question.id)}/>
                    <Divider type="vertical"/>

                    <b>{index + 1}. {question.content}</b>
                </div>

                <Radio.Group className={styles.answerContainer}>
                    {TextLevelMapping.map(level => (
                        <div className={styles.answer} key={level}>
                            <Radio checked={false} value={level}/>
                        </div>)
                    )}
                </Radio.Group>
            </div>
        </div>
    );
}