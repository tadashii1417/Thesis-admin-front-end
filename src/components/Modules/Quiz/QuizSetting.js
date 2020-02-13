import React from "react";
import {Button, DatePicker, Form, Input, InputNumber, Radio, Slider, TimePicker} from "antd";
import {GradingPolicy} from "../../../constants/quiz_constant";

class QuizSettingBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                console.log(this.props.form.isFieldsTouched(['openAt', 'closeAt']));
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {})(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="Module type:">
                    {getFieldDecorator('gradingPolicy', {})(
                        <Radio.Group>
                            <Radio value={GradingPolicy.ATTEMPT_AVERAGE}>Average Attempts</Radio>
                            <Radio value={GradingPolicy.LAST_ATTEMPT}>Last Attempt</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>

                <Form.Item label="Duration">
                    {getFieldDecorator('duration', {})(
                        <InputNumber/>
                    )}
                </Form.Item>

                <Form.Item label="Maximum attempts allowed">
                    {getFieldDecorator('numAttempt', {
                        initialValue: 1
                    })(
                        <Slider min={0} max={20} step={1}/>
                    )}
                </Form.Item>

                <Form.Item label="Pass threshold">
                    {getFieldDecorator('passThreshold', {
                        initialValue: 0.5
                    })(
                        <Slider min={0} max={1} step={0.1}/>
                    )}
                </Form.Item>

                <Form.Item label="Open at">
                    {getFieldDecorator('openAt', {})(
                        <DatePicker showTime placeholder="Select Time"/>
                    )}
                </Form.Item>

                <Form.Item label="Close at">
                    {getFieldDecorator('closeAt', {})(
                        <DatePicker showTime placeholder="Select Time"/>
                    )}
                </Form.Item>

                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Edit setting
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const QuizSetting = Form.create({name: "quiz_setting_form"})(QuizSettingBasic);

export default QuizSetting;