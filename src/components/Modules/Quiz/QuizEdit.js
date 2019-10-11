import React, {Component} from "react";
import {Button, Divider, Typography, Collapse, Icon, Result} from "antd";
import styles from './Quiz.module.css';
import * as QuestionTypes from './QuestionTypes';
import QuestionEdit from "./Question/QuestionEdit";

const {Title} = Typography;
const {Panel} = Collapse;

let questions = [
    {
        type: QuestionTypes.SINGLE_CHOICE,
        key: 1,
        title: "What day is it today ?",
        description: "This is optional",
        explanation: "This is my explanation",
        hint: "1+1=?",
        choices: [
            {
                key: 'option1',
                value: 'Monday',
                fraction: 0,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }, {
                key: 'option2',
                value: 'Tuesday',
                fraction: 1,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }, {
                key: 'option3',
                value: 'Wednesday',
                fraction: 0,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }
        ]
    },
    {
        type: QuestionTypes.MULTI_CHOICE,
        title: "Which days you go to school ?",
        explanation: "This is my explanation",
        hint: "1+1=?",
        key: 2,
        description: "This is optional",
        choices: [
            {
                key: 'option1',
                value: 'Monday',
                fraction: 0,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }, {
                key: 'option2',
                value: 'Tuesday',
                fraction: 0.5,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }, {
                key: 'option3',
                value: 'Wednesday',
                fraction: 0,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }, {
                key: 'option4',
                value: 'Thursday',
                fraction: 0.5,
                rightExplanation: "Yes you're right",
                wrongExplanation: "No, you're wrong"
            }
        ]
    }
];

const genExtra = () => {
    return (
        <React.Fragment>
            <Icon type={"edit"}></Icon>
            <Divider type={"vertical"}/>
            <Icon type={"delete"}></Icon>
        </React.Fragment>
    );
};

export default class extends Component {
    state = {
        questions: questions
    };

    addQuestionHandler = () => {
        const nQues = {
            type: QuestionTypes.SINGLE_CHOICE,
            key: 10,
            title: "New Question",
            description: "",
            explanation: "",
            hint: "",
            choices: [
                {
                    key: 'option1',
                    value: 'option 1',
                    fraction: 0,
                    rightExplanation: "",
                    wrongExplanation: ""
                }
            ]
        };
        this.setState((prevState) => {
            return {
                questions: prevState.questions.concat(nQues)
            }
        });
    };

    render() {
        return (
            <div className="adminContent">
                <Title level={4}>Editing Quiz Question</Title>
                <Button type={"primary"} icon={"plus"} className="iconEdit" onClick={this.addQuestionHandler}>Add</Button>
                <Divider/>
                {
                    this.state.questions.length ? "" : <Result
                        status="404"
                        subTitle="There is no question yet, please add more !"
                    />
                }

                <div className={styles.quizContainer}>
                    <h4>Question list</h4>
                    <Divider className={styles.divider}/>
                    <Collapse defaultActiveKey={['1']}>
                        {this.state.questions.map(item => (
                            <Panel key={item.key} header={item.title} extra={genExtra()}>
                                <QuestionEdit question={item}/>
                            </Panel>
                        ))}
                    </Collapse>
                    <Divider/>
                    <Button type={"primary"}>Save</Button>
                </div>
            </div>

        );
    }
}
