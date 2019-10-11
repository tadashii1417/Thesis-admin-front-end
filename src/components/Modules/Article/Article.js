import React from "react";
import {Button, Divider, Form, Input, Typography} from 'antd';

const {Title} = Typography;
const { TextArea} = Input;

export default function (props) {

    return (
        <div className="adminContent">
            <Title level={4}>Article !</Title>
            <Divider/>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                <Form.Item label="Title" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Content">
                    <TextArea style={{height: '300px'}}/>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}