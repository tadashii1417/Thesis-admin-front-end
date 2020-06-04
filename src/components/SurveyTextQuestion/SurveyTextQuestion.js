import React from "react";
import {Divider, Icon, Input} from "antd";
import styles from "../SurveyLevelQuestion/SurveyLevelQuestions.module.css";

const {TextArea} = Input;

export default function ({question, index, handleDelete, setSelectedQuestion, openEditModal}) {
    return (
        <div style={{marginTop: '20px', display: "flex"}}>
            <div className={styles.question}>
                <Icon type={"edit"} theme="twoTone" onClick={() => {
                    setSelectedQuestion(question);
                    openEditModal();
                }}/>

                <Divider type="vertical"/>

                <Icon type={"delete"} theme="twoTone" twoToneColor="#eb2f96" onClick={() => handleDelete(question.id)}/>
                <Divider type="vertical"/>
                <b>{index + 1}. {question.content}</b>
            </div>
            <TextArea/>
        </div>
    )
}