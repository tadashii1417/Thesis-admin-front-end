import React, {Component} from "react";
import {Breadcrumb, Card, Icon, Tabs} from "antd";
import styles from './MyProfile.module.css';
import {Link} from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const ChangePassword = React.lazy(() => import("../../components/ChangePassword/ChangePassword"));
const UserProfile = React.lazy(() => import("../../components/Profile"));

const {TabPane} = Tabs;

class MyProfile extends Component {
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
                        <Breadcrumb.Item>My Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        My Profile
                    </div>
                    <div className={styles.description}>
                        This page allow you to modify your information in the application.
                    </div>
                </div>

                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="user"/> Account Profile</span>} key="1">
                                <h3 className={styles.tabTitle}>My Profile</h3>
                                <React.Suspense fallback={<Loading/>}>
                                    <UserProfile/>
                                </React.Suspense>
                            </TabPane>

                            <TabPane tab={<span><Icon type="key"/> Update Password</span>} key="2">
                                <h3 className={styles.tabTitle}>Update password</h3>
                                <React.Suspense fallback={<Loading/>}>
                                    <ChangePassword/>
                                </React.Suspense>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default MyProfile;
