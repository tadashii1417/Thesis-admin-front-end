import React from "react";
import {Button, Divider, Form, Icon, Input, message, Select, Upload} from "antd";
import styles from './NewAccount.module.css';
import {createUser, importUser} from "../../services/user_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {ServerErrors} from "../../constants/server_error_constant";
import Loading from "../Loading/Loading";
import {getRoles} from "../../services/role_service";
import {uploadVideo} from "../../services/video_service";

class NewAccountBasic extends React.Component {
    state = {
        loading: true,
        roles: [],
        fileList: []
    }

    setFileList(newFiles) {
        this.setState({fileList: newFiles});
    }

    handleOnChangeUpload = ({file, fileList, event}) => {
        let nFileList = [...fileList];
        nFileList = nFileList.slice(-1);
        this.setFileList(nFileList);
    };

    handleUploadFile = async options => {
        const {file} = options;
        const key = "import-users";
        message.loading({content: "Loading ...", key});
        try {
            await importUser(file);
            message.success({content: "Users has been imported ! Please refresh page to see the changes", key})
        } catch (e) {
            message.error({content: "Something went wrong", key});
        }
    };

    async componentDidMount() {
        try {
            const {data} = await getRoles();
            this.setState({roles: data, loading: false});
        } catch (e) {
            message.error("Fetch roles failed");
        }
    }

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
                            case ServerErrors.INVALID_SIGNUP_DATA:
                                message.error({content: "Signup data not satisfy all constraints.", key});
                                break;
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
        const {loading, roles, fileList} = this.state;
        if (loading) return <Loading/>;

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

                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: "Please re-type new password"}]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="User type">
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: "Please select type."}]
                        })(<Select style={{width: '50%'}}>
                            {roles.map(role => <Select.Option value={role.name}>{role.name}</Select.Option>)}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="First name">
                        {getFieldDecorator('firstName', {
                            rules: []
                        })(<Input style={{width: '50%'}}/>)}
                    </Form.Item>

                    <Form.Item label="Last name">
                        {getFieldDecorator('lastName', {
                            rules: []
                        })(<Input style={{width: '50%'}}/>)}
                    </Form.Item>

                    <Form.Item label="&nbsp;">
                        <Button type="primary" htmlType="submit">
                            Create Account
                        </Button>

                        <Divider type="vertical"/>

                        <Upload
                            multiple={false}
                            customRequest={this.handleUploadFile}
                            onChange={this.handleOnChangeUpload}
                            showUploadList={false}
                            fileList={fileList}
                            defaultFileList={fileList}>
                            <Button htmlType="button">
                                <Icon type="upload"/> Import Users
                            </Button>
                        </Upload>

                    </Form.Item>

                </Form>
            </div>
        );

    }

}

const NewAccount = Form.create({name: "new_account_form"})(NewAccountBasic);

export default NewAccount;
