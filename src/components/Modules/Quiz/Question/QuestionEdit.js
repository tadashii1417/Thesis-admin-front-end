import React from "react";
import styles from './Question.module.css';
import {Button, Card, Collapse, Divider, Form, Icon, Input, Select} from "antd";

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
    const {quizChoices} = question;

    return (
        <div>
            <div className={styles.option}>
                <Collapse>
                    {quizChoices.map(choice => (
                        <Panel key={choice.id} header={choice.content} extra={genExtra()}>
                            <Form className={styles.form}>
                                <Form.Item label={"Fraction"}>
                                    <Input value={choice.fraction}/>
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
                    <Form.Item label={"Type"}>
                        <Select defaultValue="single">
                            <Option value="single">Single choice</Option>
                            <Option value="mulitple">Mulitple choice</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Title"}>
                        <Input value={question.content}/>
                    </Form.Item>
                    <Form.Item label={"Description"}>
                        <TextArea/>
                    </Form.Item>
                    <Form.Item label={"Explanation"}>
                        <Input/>
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