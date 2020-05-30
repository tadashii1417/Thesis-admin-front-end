import React from "react";
import {Button, Form, Icon, Input, message, Tooltip} from "antd";
import styles from './ChangePassword.module.css';
import {updatePassword} from "../../services/me_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";

class ChangePasswordBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (values.newPassword !== values.reNewPassword) {
                    message.error("New password not match !");
                    return;
                }

                try {
                    await updatePassword(values.newPassword, values.reNewPassword);
                    message.success("Update password successful");
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            case ServerErrors.PASSWORD_NOT_MATCH:
                                message.error("Password not match");
                                break;
                            case ServerErrors.INVALID_UPDATE_PASSWORD_DATA:
                                message.error("New password not satisfy all constraint.");
                                break;
                            default:
                                message.error("Change password failed");
                        }
                    })
                }
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
                <Form {...formItemLayout} layout={"vertical"} onSubmit={this.handleSubmit} hideRequiredMark>

                    <Form.Item label="Old password">
                        {getFieldDecorator('oldPassword', {
                            rules: [{required: true, message: "Please input old password"}]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label={<Tooltip title={<ul>
                        <li>Password must have 8-32 characters</li>
                        <li>Password must contain 1 uppercase letter.</li>
                        <li>Password must contain 1 number or special character.</li>
                    </ul>}>
                        New password
                        <span style={{padding: '0 3px'}}><Icon type="question-circle"/></span>
                    </Tooltip>}>
                        {getFieldDecorator('newPassword', {
                            rules: [{required: true, message: "Please input new password"}]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Re-enter password">
                        {getFieldDecorator('reNewPassword', {
                            rules: [{required: true, message: "Please re-type new password"}]
                        })(<Input/>)}
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