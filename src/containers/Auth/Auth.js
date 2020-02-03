import React from "react";
import {Form, Icon, Input, Button, Checkbox, Spin, Alert} from 'antd';
import styles from './Auth.module.css';

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.password);
            }
        });
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
                    <Spin spinning={this.props.loading}>
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
