import React, {Component} from "react";
import AuthContainer from "../AuthContainer/AuthContainer";
import {Button, Divider, Form, Icon, Input, message, Select} from "antd";
import {Link} from "react-router-dom";
import {forgotPassword} from "../../services/me_service";

class ForgotPasswordForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    await forgotPassword(values.source, values.email);
                    message.success("Please check your mail box");
                } catch (e) {
                    message.error("Something went wrong ! Please try again.");
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
                        <h2>Forgot Password</h2>
                    </div>

                    <Divider/>

                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {required: true, message: 'Please input your email!'},
                                {type: "email", message: 'Incorrect email'}
                            ],
                        })(<Input placeholder="Your email"
                                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
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
                            Send Email
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

const ForgotPassword = Form.create({name: 'forgot_password'})(ForgotPasswordForm);

export default ForgotPassword;