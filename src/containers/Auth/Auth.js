import React from "react";
import {Form, Icon, Input, Button, Checkbox, Spin, Alert, message} from 'antd';
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";
import styles from './Auth.module.css';

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
            <div className={styles.body}>
                <div className={styles.container}>
                    <Spin spinning={this.state.loading}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className={styles.title}>
                                <h2>Admin Login</h2>
                            </div>
                            {error}
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
                                <a className="login-form-forgot" href="/">
                                    Forgot password
                                </a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <a href="/">register now!</a>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}


const Auth = Form.create({name: 'Login'})(LoginForm);
export default Auth;
