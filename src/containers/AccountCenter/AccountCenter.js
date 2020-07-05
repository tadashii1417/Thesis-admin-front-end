import React, {Component, Suspense} from "react";
import {Breadcrumb, Card, Icon, Tabs} from "antd";
import styles from './AccountCenter.module.css';
import {Link} from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const RolesPage = React.lazy(() => import("../Roles/RolesPage"))
const UserList = React.lazy(() => import("../../components/UserList/UserList"));
const NewAccount = React.lazy(() => import("../../components/NewAccount/NewAccount"));

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
                                <Suspense fallback={<Loading/>}>
                                    <UserList/>
                                </Suspense>
                            </TabPane>

                            <TabPane tab={<span><Icon type="user"/> Manage Roles</span>} key="2">
                                <Suspense fallback={<Loading/>}>
                                    <RolesPage/>
                                </Suspense>
                            </TabPane>

                            <TabPane tab={<span><Icon type="key"/> Create New Account</span>} key="3">
                                <Suspense fallback={<Loading/>}>
                                    <NewAccount/>
                                </Suspense>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </React.Fragment>)
    }
}

export default AccountCenter;
