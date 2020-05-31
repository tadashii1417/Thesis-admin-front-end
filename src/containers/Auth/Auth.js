import React from "react";
import {Form, Icon, Input, Button, Checkbox, Spin, Alert, message} from 'antd';
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    state = {
        loading: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    this.setState({loading: true});
                    try {
                        await this.props.loginUser(values.username, values.password);
                        this.props.history.push('/courses');
                    } catch (e) {
                        httpErrorHandler(e, () => {
                            switch (e.code) {
                                case ServerErrors.INCORRECT_USERNAME_PASSWORD:
                                    message.error("Username or password is not correct !");
                                    break;

                                case ServerErrors.EMAIL_NOT_VERIFIED:
                                    message.error("Email not verified");
                                    break;

                                default:
                                    message.error("Username or password is not correct !");
                                    break;
                            }
                        })
                    } finally {
                        this.setState({loading: false})
                    }
                }
            }
        );
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let error = "";
        if (this.props.error) {
            error = <Alert message={this.props.error} type="error" showIcon/>
        }

        return (
            <AuthContainer>
                <Spin spinning={this.state.loading}>
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        <div className={"centered"}>
                            <h2>Admin Login</h2>
                        </div>

                        {error}

                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(<Input placeholder="Username"
                                      prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                      type="password"
                                      placeholder="Password"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Link className="login-form-forgot" to="/forgot-password">
                                Forgot password
                            </Link>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>
            </AuthContainer>
        );
    }
}


const Auth = Form.create({name: 'Login'})(LoginForm);
export default Auth;
