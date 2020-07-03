import React from "react";
import {Button, DatePicker, Form, Input, Switch} from "antd";
import config from "../../../config";


class NewLivestreamBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleCreateLivestream(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
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
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout} hideRequiredMark>
                <Form.Item label="Allow recording">
                    {getFieldDecorator('record', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Switch/>)}
                </Form.Item>

                <Form.Item label="Auto start recording">
                    {getFieldDecorator('autoStartRecording', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Switch/>)}
                </Form.Item>

                <Form.Item label="Allow start/stop recording">
                    {getFieldDecorator('allowStartStopRecording', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Switch/>)}
                </Form.Item>

                <Form.Item label="Max participants">
                    {getFieldDecorator('maxParticipants', {
                    })(<Input type="number" style={{width: '100px'}}/>)}
                </Form.Item>

                <Form.Item label="Expect start time">
                    {getFieldDecorator('expectedStartAt', {
                        rules: [{required: true, message: "Please select expected start time."}]
                    })(<DatePicker showTime placeholder="Select Start Time" format={config.timeFormat}/>)}
                </Form.Item>

                <Form.Item style={{textAlign: "center"}}>
                    <Button type="primary" htmlType="submit">
                        Create Livestream
                    </Button>
                </Form.Item>

            </Form>
        );

    }

}

const NewLivestream = Form.create({name: "new_livestream"})(NewLivestreamBasic);

export default NewLivestream;

// maxParticipants: Joi.number().integer().positive(),
//     record: Joi.boolean(),
//     duration: Joi.number().integer().positive(),
//     autoStartRecording: Joi.boolean(),
//     allowStartStopRecording: Joi.boolean(),
//     expectedStartAt: Joi.date().required(),
