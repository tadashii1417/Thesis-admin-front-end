import React from "react";
import {
    Button,
    DatePicker,
    Form,
    Icon,
    Input,
    InputNumber,
    Radio,
    Slider,
    Tooltip,
    Checkbox
} from "antd";
import {GradingPolicy} from "../../../constants/quiz_constant";
import {createPatch} from "../../../utils/patch_util";
import moment from "moment";
import config from "../../../config";

class QuizSettingBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const {validateFields, isFieldTouched} = this.props.form;

        const patch = [];

        validateFields((err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                this.props.handleUpdateQuiz(patch);
            }
        });
    };

    render() {
        const {data} = this.props;
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
                    {getFieldDecorator('description', {
                        initialValue: data.description
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="Module type:">
                    {getFieldDecorator('gradingPolicy', {
                        initialValue: data.gradingPolicy
                    })(
                        <Radio.Group>
                            <Radio value={GradingPolicy.ATTEMPT_AVERAGE}>Average Attempts</Radio>
                            <Radio value={GradingPolicy.LAST_ATTEMPT}>Last Attempt</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>

                <Form.Item
                    label={<span> Duration <Tooltip title={"Seconds"}><Icon type="info-circle"/></Tooltip> </span>}>
                    {getFieldDecorator('duration', {
                        initialValue: data.duration
                    })(
                        <InputNumber/>
                    )}
                </Form.Item>

                <Form.Item label="Maximum attempts allowed">
                    {getFieldDecorator('numAttempt', {
                        initialValue: data.numAttempt ? data.numAttempt: 0
                    })(
                        <Slider min={0} max={20} step={1}/>
                    )}
                </Form.Item>

                <Form.Item label="Pass threshold">
                    {getFieldDecorator('passThreshold', {
                        initialValue: data.passThreshold
                    })(
                        <Slider min={0} max={1} step={0.1}/>
                    )}
                </Form.Item>

                <Form.Item label="Shuffle answer">
                    {getFieldDecorator('shuffleAnswer', {
                        valuePropName: 'checked',
                        initialValue: data.shuffleAnswer
                    })(
                        <Checkbox/>
                    )}
                </Form.Item>

                <Form.Item label="Open at">
                    {getFieldDecorator('openAt', {
                        initialValue: data.openAt ? moment(data.openAt, config.timeFormat) : null
                    })(
                        <DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>
                    )}
                </Form.Item>

                <Form.Item label="Close at">
                    {getFieldDecorator('closeAt', {
                        initialValue: data.closeAt ? moment(data.closeAt, config.timeFormat) : null
                    })(
                        <DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>
                    )}
                </Form.Item>

                <Form.Item label={"."}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const QuizSetting = Form.create({name: "quiz_setting_form"})(QuizSettingBasic);

export default QuizSetting;