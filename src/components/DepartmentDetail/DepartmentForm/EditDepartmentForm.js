import React, {Component} from "react";
import {Button, Form, Input} from "antd";
import {createPatch} from "../../../utils/patch_util";

class EditDepartmentFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {form: {isFieldTouched, resetFields}, handleEditDepartment, closeEditDepartment} = this.props;
        let patch = [];

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                if (patch.length !== 0) {
                    await handleEditDepartment(patch);
                }
                closeEditDepartment();
                resetFields();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {department: {name}} = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Department name"}>
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{required: true, message: "Please input department name"}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Update</Button>
                </Form.Item>
            </Form>
        );
    }
}


const EditDepartmentForm = Form.create({name: 'edit_department_form'})(EditDepartmentFormBasic);

export default EditDepartmentForm;
