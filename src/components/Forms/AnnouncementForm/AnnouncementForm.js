import React from "react";
import {Button, Checkbox, Form, Input} from "antd";

export default function ({getFieldDecorator, handleUpdate, module}) {
    return (
        <Form type={"vertical"} onSubmit={handleUpdate}>
            <Form.Item label={"Announcement"} className={'article'}>
                {getFieldDecorator('content', {
                    required: true,
                    initialValue: module.instanceData ? module.instanceData.content : ""
                })(<Input.TextArea rows={5}/>)
                }
            </Form.Item>

            <Form.Item label={"Send email to students"}>
                {getFieldDecorator('email', {
                    valuePropName: 'checked',
                    initialValue: true
                })(<Checkbox/>)
                }
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Update </Button>
            </Form.Item>
        </Form>
    );
}