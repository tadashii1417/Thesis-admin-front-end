import React, {Component} from "react";
import {Icon, Tabs} from "antd";
import UserProfile from "../../components/Profile";
import styles from './Account.module.css';

const {TabPane} = Tabs;

class AccountsCenter extends Component {
    render() {
        return <div className="adminContent">
            <Tabs defaultActiveKey="1" tabPosition={"left"}>
                <TabPane tab={<span><Icon type="user"/> User Profile</span>} key="1">
                    <div className={styles.tabTitle}>User Profile</div>
                    <UserProfile/>
                </TabPane>

                <TabPane tab={<span><Icon type="snippets"/> Manage Accounts</span>} key="2">
                    Accounts
                </TabPane>
            </Tabs>
        </div>
    }
}

export default AccountsCenter;