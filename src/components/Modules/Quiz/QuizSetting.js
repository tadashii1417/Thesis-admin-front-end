import React from "react";
import {Button, DatePicker, Divider, Form, Input, TimePicker, Typography} from 'antd';

const {Title} = Typography;
const {TextArea} = Input;

export default function (props) {
    return (
        <div className="adminContent">
            <Title level={4}>New Quiz Setting !</Title>
            <Divider/>
            <Form labelCol={{span: 5}} wrapperCol={{span: 15}}>
                <Form.Item label="Title" required>
                    <Input/>
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea style={{height: '120px'}}/>
                </Form.Item>
                <Form.Item label={"Open quiz date"} required>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label={"Open quiz time"}>
                    <TimePicker/>
                </Form.Item>
                <Form.Item label={"Time limit"}>
                    <Input placeholder={"minutes"}/>
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