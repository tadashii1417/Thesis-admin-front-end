import React, {Component} from "react";
import {Button, Form, Input} from "antd";
import {createPatch} from "../../utils/patch_util";

class SemesterFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {form: {validateFieldsAndScroll, isFieldTouched, resetFields}, handleEditSemester, closeEditSemester} = this.props;
        let patch = [];

        validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                if (patch.length !== 0) {
                    await handleEditSemester(patch);
                }
                closeEditSemester();
                resetFields();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {semester: {name}} = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Semester name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please input semester name"}],
                        initialValue: name
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Update</Button>
                </Form.Item>
            </Form>
        );
    }
}


const EditSemesterForm = Form.create({name: 'edit_semester_form'})(SemesterFormBasic);

export default EditSemesterForm;