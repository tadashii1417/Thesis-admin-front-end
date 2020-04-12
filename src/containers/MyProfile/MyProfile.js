import React, {Component} from "react";
import {Divider, Icon, Tabs} from "antd";
import UserProfile from "../../components/Profile";
import styles from './MyProfile.module.css';
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const {TabPane} = Tabs;

class MyProfile extends Component {
    render() {
        return <div className={styles.container}>
            <Tabs defaultActiveKey="1" tabPosition={"left"}>
                <TabPane tab={<span><Icon type="user"/> My Profile</span>} key="1">
                    <h3 className={styles.tabTitle}>My Profile</h3>
                    <Divider/>
                    <UserProfile/>
                </TabPane>

                <TabPane tab={<span><Icon type="key"/> Change Password</span>} key="2">
                    <h3 className={styles.tabTitle}>Update password</h3>
                    <Divider/>
                    <ChangePassword/>
                </TabPane>
            </Tabs>
        </div>
    }
}

export default MyProfile;