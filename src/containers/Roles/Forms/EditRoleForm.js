import React, {Component} from "react";
import {Button, Form, Input} from "antd";
import {createPatch} from "../../../utils/patch_util";

class EditRoleFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {form: {isFieldTouched, validateFieldsAndScroll}, handleEditRole, closeEditRole} = this.props;
        let patch = [];
        validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                if (patch.length > 0) {
                    handleEditRole(patch);
                }
                closeEditRole();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {role} = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Role name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please input role name"}],
                        initialValue: role.name
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label={"Description"}>
                    {getFieldDecorator('description', {
                        initialValue: role.description
                    })(<Input.TextArea/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Update</Button>
                </Form.Item>
            </Form>
        );
    }
}


const EditRoleForm = Form.create({name: 'edit_role_form'})(EditRoleFormBasic);

export default EditRoleForm;
