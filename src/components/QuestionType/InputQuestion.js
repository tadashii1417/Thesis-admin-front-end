import React from "react";
import styles from "./QuestionType.module.css";
import {EditorContent} from "lerna-rte";
import {Icon, Input, Row} from "antd";

export default function (props) {
    const {data, index} = props;
    const {content, choices, mark, answer, attemptMark} = data;
    const answers = choices.filter(choice => choice.fraction !== 0);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span className={styles.index}>Question
                    <b style={{fontSize: '1.5em'}}> {index + 1}</b>
                </span>
                <div>{attemptMark > 0 ?
                    <span style={{color: "#52c41a"}}>True</span> :
                    <span style={{color: "#f759ab"}}>False</span>}
                </div>
                <div>Grade {attemptMark} of {mark}</div>
            </div>

            <div className={styles.content}>
                <div className={styles.question}>
                    <EditorContent content={content} className={styles.title}/>
                    <Row>
                        <Input value={answer} style={{width: '70%'}}/>
                        {answers.filter(ans => ans.content === answer).length ?
                            <Icon type={'check-circle'} className={styles.correct}/> :
                            <Icon type={'close-circle'} className={styles.incorrect}/>}
                    </Row>
                </div>
                <div className={styles.answer}>
                    The correct answer is {answers.map(i => <EditorContent key={i.id} content={i.content}
                                                                           isInline={true}/>)}
                </div>
            </div>
            <p style={{clear: 'both'}}/>
        </div>
    )
}
