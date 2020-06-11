import React, {Component} from "react";
import {Button, Form, Input} from "antd";

class NewDepartmentFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {handleNewDepartment, closeNewDepartment} = this.props;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await handleNewDepartment(values);
                closeNewDepartment();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label={"Department name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please input department name"}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        );
    }
}


const NewDepartmentForm = Form.create({name: 'new_department_form'})(NewDepartmentFormBasic);

export default NewDepartmentForm;
