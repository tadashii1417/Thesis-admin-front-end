import React from "react";
import styles from './LevelQuestionResult.module.css';
import {Col, Progress, Row} from "antd";
import {TextLevelMapping} from "../../../../constants/survey_constant";
import MyProgress from "../../../MyProgress/MyProgress";

export default function (props) {
    const {index, question} = props;

    const defaultResult = <Progress percent={0} size="small"/>;
    let option0 = defaultResult;
    let option1 = defaultResult;
    let option2 = defaultResult;
    let option3 = defaultResult;
    let option4 = defaultResult;

    let total0 = 0;
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;

    if (question.answers[0]) {
        const percent = question.answers[0] / question.total * 100;
        total0 = question.answers[0];
        option0 = <MyProgress percent={percent}/>;
    }
    if (question.answers[1]) {
        const percent = question.answers[1] / question.total * 100;
        total1 = question.answers[1];
        option1 = <MyProgress percent={percent}/>;
    }
    if (question.answers[2]) {
        const percent = question.answers[2] / question.total * 100;
        total2 = question.answers[2];
        option2 = <MyProgress percent={percent}/>;
    }
    if (question.answers[3]) {
        const percent = question.answers[3] / question.total * 100;
        total3 = question.answers[3];
        option3 = <MyProgress percent={percent}/>;
    }
    if (question.answers[4]) {
        const percent = question.answers[4] / question.total * 100;
        total4 = question.answers[4];
        option4 = <MyProgress percent={percent}/>;
    }

    return (
        <div className={styles.container}>
            <h4>{index}. {question.content} ?</h4>
            <Row>
                <Col sm={24} md={10} lg={10}>
                    <div className={styles.colContainer}>
                        <h4>Answers</h4>
                        <div>{TextLevelMapping[0]}</div>
                        <div>{TextLevelMapping[1]}</div>
                        <div>{TextLevelMapping[2]}</div>
                        <div>{TextLevelMapping[3]}</div>
                        <div style={{border: 'none'}}>{TextLevelMapping[4]}</div>
                    </div>
                </Col>

                <Col xm={14} sm={14} md={8} lg={8}>
                    <div className={styles.percentContainer}>
                        <h4>Average</h4>
                        <div>{option0}</div>
                        <div>{option1}</div>
                        <div>{option2}</div>
                        <div>{option3}</div>
                        <div style={{border: 'none'}}>{option4}</div>
                    </div>
                </Col>

                <Col xm={10} sm={10} md={6} lg={6}>
                    <div className={styles.totalContainer}>
                        <h4>Total</h4>
                        <div>{total0}</div>
                        <div>{total1}</div>
                        <div>{total2}</div>
                        <div>{total3}</div>
                        <div style={{border: 'none'}}>{total4}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );

}
