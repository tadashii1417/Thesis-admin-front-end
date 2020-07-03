import React, {Component} from "react";
import {Button, Form, Input, Select} from "antd";
import {SurveyQuestionType} from "../../../constants/survey_constant";
import {createPatch} from "../../../utils/patch_util";

class EditSurveyQuestionForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {isFieldTouched, validateFields, resetFields} = this.props.form;
        const {handleEditQuestion, question, closeEditQuestion} = this.props;
        let patch = [];

        validateFields(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                await handleEditQuestion(question.id, patch);
                closeEditQuestion();
                resetFields();
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {question} = this.props;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label={"Content"}>
                    {getFieldDecorator("content", {
                        rules: [{required: true, message: "Please input content"}],
                        initialValue: question.content
                    })(<Input.TextArea/>)}
                </Form.Item>

                <Form.Item label={"Type"}>
                    {getFieldDecorator("type", {
                        initialValue: question.type
                    })(
                        <Select disabled>
                            <Select.Option value={SurveyQuestionType.LEVEL}>Mức độ hài lòng</Select.Option>
                            <Select.Option value={SurveyQuestionType.TEXT}>Trả lời câu hỏi</Select.Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item style={{textAlign: "center"}}>
                    <Button type="primary" htmlType="submit">Update question</Button>
                </Form.Item>
            </Form>
        )
    }
}

const EditSurveyQuestion = Form.create({name: 'edit_survey_question'})(EditSurveyQuestionForm);

export default EditSurveyQuestion;
