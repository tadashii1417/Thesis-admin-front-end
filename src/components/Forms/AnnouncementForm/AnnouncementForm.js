import React from "react";
import {Button, Form, Input, Switch} from "antd";

export default function ({getFieldDecorator, handleUpdate, module}) {
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 12},
        },
    };

    return (
        <Form layout={"vertical"} onSubmit={handleUpdate}>
            <Form.Item label={"Announcement"} className={'article'}>
                {getFieldDecorator('content', {
                    required: true,
                    initialValue: module.instanceData ? module.instanceData.content : ""
                })(<Input.TextArea rows={5}/>)
                }
            </Form.Item>

            <Form.Item label={"Send email to students"} {...formItemLayout}>
                {getFieldDecorator('email', {
                    valuePropName: 'checked',
                    initialValue: true
                })(<Switch/>)
                }
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Update </Button>
            </Form.Item>
        </Form>
    );
}