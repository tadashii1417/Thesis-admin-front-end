import React from "react";
import styles from './TextQuestionResult.module.css';
import {Icon} from "antd";

export default function (props) {
    const {index, question} = props;

    return (
        <div className={styles.container}>
            <h4>{index}. {question.content}</h4>
            <div className={styles.answersContainer}>

                {question.answers.map((answer, i) => (
                    <div className={styles.answer} key={i}>
                        <Icon type="more" className={styles.icon}/>
                        {answer}
                    </div>
                ))}

            </div>
        </div>
    )
}
