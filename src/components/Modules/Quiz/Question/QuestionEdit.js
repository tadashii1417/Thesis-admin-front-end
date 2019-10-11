import React from "react";
import styles from './Question.module.css';
import {Button, Card, Collapse, Divider, Form, Icon, Input} from "antd";

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

    return (
        <div>
            <div className={styles.option}>
                <Collapse>
                    {question.choices.map(choice => (
                        <Panel key={choice.key} header={choice.value} extra={genExtra()}>
                            <Form className={styles.form}>
                                <Form.Item label={"Fraction"}>
                                    <Input value={choice.fraction}/>
                                </Form.Item>
                                <Form.Item label={"Right answer explanation"}>
                                    <Input value={choice.rightExplanation}/>
                                </Form.Item>
                                <Form.Item label={"Wrong answer explanation"}>
                                    <Input value={choice.wrongExplanation}/>
                                </Form.Item>
                            </Form>
                        </Panel>
                    ))}
                </Collapse>
                <Button type={"link"} icon={"plus"} style={{margin: "5px", float:"right"}}>Add option</Button>
            </div>

            <Card title={"Question Setting"} size={"small"} className={styles.setting} extra={<Icon type={"setting"}/>}>
                <Form className={styles.form}>
                    <Form.Item label={"Title"}>
                        <Input value={question.title}/>
                    </Form.Item>
                    <Form.Item label={"Description"}>
                        <TextArea value={question.description}/>
                    </Form.Item>
                    <Form.Item label={"Explanation"}>
                        <Input value={question.explanation}/>
                    </Form.Item>
                    <Form.Item label={"Hint"}>
                        <Input value={question.hint}/>
                    </Form.Item>
                </Form>
            </Card>
            <p className={styles.clear}/>
        </div>
    );
}