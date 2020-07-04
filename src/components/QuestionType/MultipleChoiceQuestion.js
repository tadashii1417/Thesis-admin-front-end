import React from "react";
import styles from './QuestionType.module.css';
import {EditorContent} from "lerna-rte";
import {Checkbox, Col, Icon, Row} from "antd";

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
                    <br/>
                    <br/>
                    <Row>
                        {
                            choices.map(choice =>
                                <Col xm={24} sm={12} md={8} key={choice.id}>
                                    <Checkbox checked={answer && answer.includes(choice.id)}
                                              className={styles.optionContainer}>
                                        
                                        <div style={{display: 'flex'}}>
                                            <EditorContent content={choice.content} className={styles.option}/>
                                            {choice.id === answer ? (
                                                answers.filter(ans => ans.id === answer).length ?
                                                    <Icon type={'check-circle'} className={styles.correct}/> :
                                                    <Icon type={'close-circle'} className={styles.incorrect}/>
                                            ) : ""}
                                        </div>
                                    </Checkbox>
                                </Col>
                            )
                        }
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
