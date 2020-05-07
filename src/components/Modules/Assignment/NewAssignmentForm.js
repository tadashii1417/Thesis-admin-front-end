import React, {Component} from 'react';
import {Button, DatePicker, Form, Icon, Upload} from "antd";
import {Editor} from 'doodle-editor';
import config from "../../../config";


class AssignmentFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleNewAssignment(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 19}} layout={"vertical"} onSubmit={this.handleSubmit}>

                <Form.Item label="Description">
                    {getFieldDecorator('intro', {
                        rules: [{required: true, message: 'Please input description.'}]
                    })(<Editor/>)}
                </Form.Item>

                <Form.Item label="Open at">
                    {getFieldDecorator('openAt', {
                        initialValue: null
                    })(<DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>)}
                </Form.Item>

                <Form.Item label="Close at">
                    {getFieldDecorator('closeAt', {
                        initialValue: null
                    })(<DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>)}
                </Form.Item>

                <Form.Item label="Files">
                    {getFieldDecorator('attachmentFiles', {})(
                        <Upload.Dragger name="files" multiple={true}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

const NewAssignmentForm = Form.create({name: 'new_assignment_form'})(AssignmentFormBasic);

export default NewAssignmentForm;