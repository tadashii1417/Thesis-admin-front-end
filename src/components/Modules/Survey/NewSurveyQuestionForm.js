import React, {Component} from "react";
import {Button, Form, Input, Select} from "antd";
import {SurveyQuestionType} from "../../../constants/survey_constant";

class NewSurveyQuestionForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {validateFields} = this.props.form;

        validateFields((err, values) => {
            if (!err) {
                this.props.handleNewQuestion(values);
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label={"Content"}>
                    {getFieldDecorator("content", {
                        rules: [{required: true, message: "Please input content"}]
                    })(<Input.TextArea/>)}
                </Form.Item>

                <Form.Item label={"Type"}>
                    {getFieldDecorator("type", {
                        initialValue: SurveyQuestionType.LEVEL
                    })(
                        <Select>
                            <Select.Option value={SurveyQuestionType.LEVEL}>Mức độ hài lòng</Select.Option>
                            <Select.Option value={SurveyQuestionType.TEXT}>Trả lời câu hỏi</Select.Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item style={{textAlign: "center"}}>
                    <Button type="primary" htmlType="submit">Add question</Button>
                </Form.Item>
            </Form>
        )
    }
}

const NewSurveyQuestion = Form.create({name: 'new_survey_question'})(NewSurveyQuestionForm);

export default NewSurveyQuestion;
