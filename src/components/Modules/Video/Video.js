import React from "react";
import {Button, Divider, Form, Input, Typography} from 'antd';

const {Title} = Typography;

export default function (props) {

    return (
        <div className="adminContent">
            <Title level={4}>Video Content!</Title>
            <Divider/>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                <Form.Item label="Title" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Video URL:">
                    <Input />
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