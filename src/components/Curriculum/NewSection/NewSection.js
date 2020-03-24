import React from "react";
import {Button, Form, Input} from "antd";

const {TextArea} = Input;


class NewSectionBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSectionChange(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Session Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: "Please input section title"}]
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: []
                    })(
                        <TextArea/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const NewSection = Form.create({name: "section_form"})(NewSectionBasic);

export default NewSection;