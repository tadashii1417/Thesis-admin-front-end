import React, {Component} from "react";
import {Divider, Icon, Tabs} from "antd";
import styles from './AccountCenter.module.css';
import UserList from "../../components/UserList/UserList";
import NewAccount from "../../components/NewAccount/NewAccount";

const {TabPane} = Tabs;

class AccountCenter extends Component {
    render() {
        return <div className={styles.container}>
            <Tabs defaultActiveKey="1" tabPosition={"left"}>
                <TabPane tab={<span><Icon type="usergroup-add"/> Manage Users</span>} key="1">
                    <UserList/>
                </TabPane>

                <TabPane tab={<span><Icon type="key"/> Create Account</span>} key="2">
                    <h3 className={styles.tabTitle}>Create new account</h3>
                    <Divider/>
                    <NewAccount/>
                </TabPane>
            </Tabs>
        </div>
    }
}

export default AccountCenter;