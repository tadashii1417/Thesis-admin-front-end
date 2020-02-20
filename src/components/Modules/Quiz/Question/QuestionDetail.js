import React from "react";
import styles from './Question.module.css';
import {Button, Card, Collapse, Divider, Form, Icon, Input, InputNumber, Select} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";

const {Option} = Select;
const {Panel} = Collapse;
const {TextArea} = Input;
const genExtra = () => {
    return (
        <React.Fragment>
            <Icon type={"edit"}/>
            <Divider type={"vertical"}/>
            <Icon type={"delete"}/>
        </React.Fragment>
    );
};
export default function (props) {
    const {question} = props;
    const {choices} = question;

    return (
        <div>
            <div className={styles.option}>
                <Collapse accordion>
                    {choices.map(choice => (
                        <Panel key={choice.content} header={choice.content} extra={genExtra()}>
                            <Form className={styles.form}>
                                <Form.Item label={"Fraction"}>
                                    <InputNumber value={choice.fraction}/>
                                </Form.Item>
                                <Form.Item label={"Right answer explanation"}>
                                    <Input value={choice.correctFeedback}/>
                                </Form.Item>
                                <Form.Item label={"Wrong answer explanation"}>
                                    <Input value={choice.incorrectFeedback}/>
                                </Form.Item>
                            </Form>
                        </Panel>
                    ))}
                </Collapse>
                <Button type={"link"} icon={"plus"} style={{margin: "5px", float: "right"}}>Add option</Button>
            </div>

            <Card title={"Question Setting"} size={"small"} className={styles.setting} extra={<Icon type={"setting"}/>}>
                <Form className={styles.form}>
                    <Form.Item label={"Content"}>
                        <TextArea value={question.content}/>
                    </Form.Item>
                    <Form.Item label={"Type"}>
                        <Select value={question.type}>
                            <Option value={QuestionType.SINGLE_ANSWER}>Single answer</Option>
                            <Option value={QuestionType.MULTIPLE_ANSWER}>Mulitple answer</Option>
                            <Option value={QuestionType.INPUT}>Fill in the blank</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Mark"}>
                        <InputNumber value={question.mark}/>
                    </Form.Item>
                    <Form.Item label={"Hint"}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Card>
            <p className={styles.clear}/>
        </div>
    );
}