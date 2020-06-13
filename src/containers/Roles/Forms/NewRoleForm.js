import React, {Component} from "react";
import {Button, Form, Input} from "antd";

class NewRoleFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {handleNewRole, closeNewRole} = this.props;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await handleNewRole(values);
                closeNewRole();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Role name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please input role name"}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label={"Description"}>
                    {getFieldDecorator('description', {})(<Input.TextArea/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        );
    }
}


const NewRoleForm = Form.create({name: 'new_role_form'})(NewRoleFormBasic);

export default NewRoleForm;
