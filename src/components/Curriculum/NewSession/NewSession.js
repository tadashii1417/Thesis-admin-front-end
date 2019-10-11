import React from "react";
import {Form, Input} from "antd";
const {TextArea} = Input;
export default function (props) {
    return (
        <Form layout="vertical">
            <Form.Item label="Session Title">
                <Input/>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea/>
            </Form.Item>
        </Form>
    );
}