import React, {Component} from "react";
import styles from './Question.module.css';
import {Button, Card, Collapse, Divider, Form, Icon, Input, InputNumber, Modal, Select} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";
import {EditorContent} from 'doodle-editor';
import QuestionEditForm from "./QuestionEditForm";

const {Option} = Select;
const {Panel} = Collapse;

export default class extends Component {
    state = {
        editModal: false
    };

    handleCancelEdit = () => {
        this.setState({editModal: false})
    };

    openEditModal = () => {
        this.setState({editModal: true});
    };

    render() {
        const {question} = this.props;
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
                            <Panel key={choice.id} header={<EditorContent content={choice.content}/>}>
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

                <Card title={"Question detail"} size={"small"} className={styles.setting}
                      extra={<Icon type={"setting"}/>}>
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
                        <Divider style={{visibility: "hidden"}}/>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button icon={"edit"} type={"primary"} onClick={this.openEditModal}>Edit</Button>
                        </div>
                    </Form>
                </Card>
                <p className={styles.clear}/>

                <Modal title={"Edit question"}
                       visible={this.state.editModal}
                       onCancel={this.handleCancelEdit}
                       bodyStyle={{padding: "12px 20px"}}
                       style={{top: 20}}
                       width={'60%'}
                       footer={null}>
                    <QuestionEditForm data={question} editQuestionHandler={this.props.editQuestionHandler} handleCancel={this.handleCancelEdit}/>
                </Modal>
            </div>
        );
    }
}