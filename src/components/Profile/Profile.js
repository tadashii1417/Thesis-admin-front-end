import React, {Component} from 'react';
import {Form, Input, Button, message, Divider} from 'antd';
import styles from './Profile.module.css';
import {createPatch} from "../../utils/patch_util";
import {updateAvatar, updateProfile, updateUsername} from "../../services/me_service";
import AvatarView from "../AvatarView/AvatarView";
import TextArea from "antd/es/input/TextArea";
import {UserType} from "../../constants/user_contant";

const FormItem = Form.Item;


class Profile extends Component {
    state = {
        username: this.props.user.username
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        const {isFieldTouched, validateFields} = this.props.form;
        let patch = [];

        validateFields(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                try {
                    await updateProfile(patch);
                    await this.props.getMe();
                    message.success("Update profile successful");
                } catch (e) {
                    message.error("Something went wrong");
                }
            }
        });
    };

    handleUpdateUsername = async () => {
        try {
            const {username} = this.state;
            await updateUsername(username);
            message.success("Username update successfully");
        } catch (e) {
            message.error("Username not available or not have 8-32 characters.");
        }
    }

    handleUpdateAvatar = async (upload) => {
        const key = "update-avatar";
        try {
            message.loading({content: "Loading ...", key})
            await updateAvatar(upload.fileList[0].originFileObj);
            await this.props.getMe();
            message.success({content: "Update avatar successful", key});
        } catch (e) {
            message.error({content: "Update avatar failed", key});
        }
    }

    render() {
        const {
            form: {getFieldDecorator}, user: {email, firstName, lastName, avatar, biography, title, type}
        } = this.props;

        return (
            <div className={styles.baseView}>
                <div className={styles.left}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>

                        <FormItem label={"Email"}>
                            {getFieldDecorator('email', {
                                rules: [],
                                initialValue: email
                            })(<Input disabled/>)}
                        </FormItem>

                        <FormItem label={"First name"}>
                            {getFieldDecorator('firstName', {
                                rules: [],
                                initialValue: firstName
                            })(<Input/>)}
                        </FormItem>

                        <FormItem label={"Last name"}>
                            {getFieldDecorator('lastName', {
                                rules: [],
                                initialValue: lastName
                            })(<Input/>)}
                        </FormItem>


                        {type === UserType.INSTRUCTOR && (
                            <>
                                <FormItem label={"Title"}>
                                    {getFieldDecorator('title', {
                                        rules: [],
                                        initialValue: title
                                    })(<Input/>)}
                                </FormItem>

                                <FormItem label={"Biography"}>
                                    {getFieldDecorator('biography', {
                                        rules: [],
                                        initialValue: biography
                                    })(<TextArea rows={3}/>)}
                                </FormItem>
                            </>
                        )}

                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView avatar={avatar ? avatar['200x200'] : null}
                                handleUpdateAvatar={this.handleUpdateAvatar}/>
                    <Divider style={{visibility: 'hidden'}}/>

                    <div>Username</div>
                    <div className={styles.usernameArea}>
                        <Input value={this.state.username} onChange={this.onChangeUsername}/>
                        <Button icon="history" onClick={this.handleUpdateUsername}>Change</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const UserProfile = Form.create({name: "Profile_form"})(Profile);

export default UserProfile;
