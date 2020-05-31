import React, {Component} from "react";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import {Button, Divider, Form, Icon, Input, message, Select} from "antd";
import {Link, Redirect} from "react-router-dom";
import queryString from 'query-string';
import {resetPassword} from "../../services/me_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";

class ForgotPasswordForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    const {email, sig, deadline} = queryString.parse(this.props.location.search);
                    await resetPassword(email, sig, deadline, values);
                    message.success("Password has been reset");
                    this.props.history.push('/login');
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            case ServerErrors.RESET_PW_LINK_EXPIRES:
                                message.error("This link has expired ! Please reset again");
                                break;
                            case ServerErrors.INVALID_RESET_PASSWORD_DATA:
                                message.error("New password not satisfy all constraint");
                                break;
                            default:
                                message.error("Something went wrong ! Please try again.");
                        }
                    })
                }
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <AuthContainer>
                <Form className="login-form" layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>

                    <div className={"centered"}>
                        <h2>Reset Password</h2>
                    </div>

                    <Divider/>

                    <Form.Item>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {required: true, message: 'Please input new password'}
                            ],
                        })(<Input placeholder="New Password" type="password"
                                  prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('source', {
                            rules: [],
                            initialValue: "admin"
                        })(<Select disabled>
                                <Select.Option value="admin">Admin / Instructor</Select.Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item className="centered">
                        <Button type="primary" htmlType="submit">
                            Reset
                        </Button>
                    </Form.Item>

                    <div>
                        <Link to={"/login"}>
                            <Icon style={{color: 'black', fontSize: '16px', padding: '2px'}}
                                  type="arrow-left"/> Back
                        </Link>
                    </div>

                </Form>
            </AuthContainer>
        );
    }
}

const ResetPassword = Form.create({name: 'reset_password'})(ForgotPasswordForm);

export default ResetPassword;