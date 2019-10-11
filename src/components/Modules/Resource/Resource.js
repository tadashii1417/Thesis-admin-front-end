import React from "react";
import {Button, Divider, Form, Input, Typography, Upload, Icon, DatePicker} from 'antd';

const {RangePicker} = DatePicker;
const {Title} = Typography;
const {TextArea} = Input;

export default function (props) {

    return (
        <div className="adminContent">
            <Title level={4}>Add Resource !</Title>
            <Divider/>
            <Form labelCol={{span: 5}} wrapperCol={{span: 15}}>
                <Form.Item label="Title" required>
                    <Input/>
                </Form.Item>
                <Form.Item label="Files" required>
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}