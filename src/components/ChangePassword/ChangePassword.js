import React from "react";
import {Button, Form, Input} from "antd";
import styles from './ChangePassword.module.css';

class ChangePasswordBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleNewModule(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <div className={styles.container}>
                <Form {...formItemLayout} layout={"vertical"} onSubmit={this.handleSubmit}>
                    <Form.Item label="Old password">
                        {getFieldDecorator('old-password', {
                            rules: [{required: true, message: "Please input old password"}]
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label="New password">
                        {getFieldDecorator('new-password', {
                            rules: [{required: true, message: "Please input new password"}]
                        })(
                            <Input/>
                        )}
                    </Form.Item>

                    <Form.Item label="Re-enter password">
                        {getFieldDecorator('re-password', {
                            rules: [{required: true, message: "Please re-type new password"}]
                        })(
                            <Input/>
                        )}
                    </Form.Item>


                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        );

    }

}

const ChangePassword = Form.create({name: "change_password_form"})(ChangePasswordBasic);

export default ChangePassword;