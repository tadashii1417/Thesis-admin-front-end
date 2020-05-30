import React from "react";
import {Button, Form, Input, message, Select} from "antd";
import styles from './NewAccount.module.css';
import {UserType} from "../../constants/user_contant";
import {createUser} from "../../services/user_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";

class NewAccountBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const key = "create-user";
                message.loading({content: "Loading ...", key});
                try {
                    await createUser(values);
                    message.success({content: "New user has been created.", key});
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            case ServerErrors.USERNAME_ALREADY_EXISTS:
                                message.error({content: "Username already exists", key});
                                break;
                            case ServerErrors.EMAIL_ALREADY_EXISTS:
                                message.error({content: "Email already exists", key});
                                break;
                            default:
                                message.error({content: "Something went wrong", key});
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
                <Form {...formItemLayout} layout={"vertical"} onSubmit={this.handleSubmit}>
                    <Form.Item label="Username">
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: "Please input old password"}]
                        })(<Input/>)}
                    </Form.Item>


                    <Form.Item label="User type">
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: "Please select type."}]
                        })(<Select style={{width: '50%'}}>
                            <Select.Option value={UserType.STAFF}>Staff</Select.Option>
                            <Select.Option value={UserType.LEARNER}>Leaner</Select.Option>
                            <Select.Option value={UserType.INSTRUCTOR}>Instructor</Select.Option>
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: "Please re-type new password"}]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="First name">
                        {getFieldDecorator('firstName', {
                            rules: []
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Last name">
                        {getFieldDecorator('lastName', {
                            rules: []
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        );

    }

}

const NewAccount = Form.create({name: "new_account_form"})(NewAccountBasic);

export default NewAccount;