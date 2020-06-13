import React, {Component} from "react";
import {Breadcrumb, Card, Divider, Icon, Tabs} from "antd";
import styles from './AccountCenter.module.css';
import UserList from "../../components/UserList/UserList";
import NewAccount from "../../components/NewAccount/NewAccount";
import {Link} from "react-router-dom";
import RolesPage from "../Roles/RolesPage";

const {TabPane} = Tabs;

class AccountCenter extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/"}>
                                <Icon type="home"/>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Account Center</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Manage Accounts
                    </div>
                    <div className={styles.description}>
                        This page allow admin to manage accounts of the application.
                    </div>
                </div>

                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="usergroup-add"/> Manage Accounts</span>} key="1">
                                <UserList/>
                            </TabPane>

                            <TabPane tab={<span><Icon type="user"/> Manage Roles</span>} key="2">
                                <RolesPage/>
                            </TabPane>

                            <TabPane tab={<span><Icon type="key"/> Create New Account</span>} key="3">
                                <h3 className={styles.tabTitle}>Create new account</h3>
                                <Divider/>
                                <NewAccount/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </React.Fragment>)
    }
}

export default AccountCenter;
