import React, {Component} from "react";
import {Button, Form, Input} from "antd";

class SemesterFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {handleNewSemester, closeNewSemester} = this.props;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await handleNewSemester(values);
                closeNewSemester();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Semester name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please input semester name"}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        );
    }
}


const SemesterForm = Form.create({name: 'semester_form'})(SemesterFormBasic);

export default SemesterForm;