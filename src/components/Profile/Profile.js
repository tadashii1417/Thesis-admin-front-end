import React, {Component, Fragment} from 'react';
import {Form, Input, Upload, Button} from 'antd';
import styles from './Profile.module.css';

const FormItem = Form.Item;

const AvatarView = ({avatar}) => (
    <Fragment>
        <div className={styles.avatar_title}>
            Avatar
        </div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar"/>
        </div>
        <Upload fileList={[]}>
            <div className={styles.button_view}>
                <Button icon="upload">
                    Change Avatar
                </Button>
            </div>
        </Upload>
    </Fragment>
);

class Profile extends Component {
    getAvatarURL() {
        return 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    }

    render() {
        const {
            form: {getFieldDecorator}, user: {email, firstName, lastName}
        } = this.props;

        return (
            <div className={styles.baseView}>
                <div className={styles.left}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <FormItem label={"Email"}>
                            {getFieldDecorator('email', {
                                rules: [],
                                initialValue: email
                            })(<Input/>)}
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
                        <FormItem label={"Profile"}>
                            {getFieldDecorator('profile', {
                                rules: [],
                            })(
                                <Input.TextArea
                                    placeholder={"Your basic info"}
                                    rows={4}
                                />
                            )}
                        </FormItem>

                        <Button type="primary">
                            Update
                        </Button>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView avatar={this.getAvatarURL()}/>
                </div>
            </div>
        );
    }
}

const UserProfile = Form.create({name: "Profile_form"})(Profile);

export default UserProfile;