import React from "react";
import styles from './Question.module.css';
import {Card, Collapse, Form, Icon, Input, InputNumber, Select} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";
import {EditorContent} from 'doodle-editor';

const {Option} = Select;
const {Panel} = Collapse;
const {TextArea} = Input;

export default function (props) {
    const {question} = props;
    const {choices} = question;

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 12},
        },
    };

    return (
        <div>
            <div className={styles.option}>
                <Collapse accordion>
                    {choices.map(choice => (
                        <Panel key={choice.content} header={<EditorContent content={choice.content}/>}>
                            <Form className={styles.form} layout={"vertical"}>
                                <Form.Item label={"Fraction"} {...formItemLayout}>
                                    <InputNumber value={choice.fraction}/>
                                </Form.Item>
                                <Form.Item label={"Option Feedback"}>
                                    <Input value={choice.feedback}/>
                                </Form.Item>
                            </Form>
                        </Panel>
                    ))}
                </Collapse>
            </div>

            <Card title={"Question detail"} size={"small"} className={styles.setting} extra={<Icon type={"setting"}/>}>
                <Form className={styles.form} layout={"vertical"}>
                    <Form.Item label={"Content"}>
                        <EditorContent content={question.content}/>
                    </Form.Item>
                    <Form.Item label={"Mark"} {...formItemLayout}>
                        <InputNumber value={question.mark}/>
                    </Form.Item>
                    <Form.Item label={"Type"} {...formItemLayout}>
                        <Select value={question.type}>
                            <Option value={QuestionType.SINGLE_ANSWER}>Single answer</Option>
                            <Option value={QuestionType.MULTIPLE_ANSWER}>Mulitple answer</Option>
                            <Option value={QuestionType.INPUT}>Fill in the blank</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
            <p className={styles.clear}/>
        </div>
    );
}