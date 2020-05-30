import React, {Component} from "react";
import {Layout, Menu, Icon, Dropdown, Avatar, Tooltip} from "antd";
import styles from "./AdminHeader.module.css";
import {Redirect} from "react-router";
import {defaultAvatar} from "../../constants/dev_constant";

const {Header} = Layout;


class AdminHeader extends Component {
    rightMenu = (
        <Menu className={styles.menu} selectedKeys={[]}>
            <Menu.Item key="userCenter">
                <Icon type="user"/>
                <span>Account Center</span>
            </Menu.Item>
            <Menu.Item key="userinfo">
                <Icon type="setting"/>
                <span>Account Setting</span>
            </Menu.Item>
            <Menu.Item key="triggerError">
                <Icon type="solution"/>
                <span>Profile</span>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout" onClick={this.props.logout}>
                <Icon type="logout"/>
                <span>Logout</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        const {user} = this.props;
        if (!user) {
            return <Redirect to={'/login'}/>
        }
        const {firstName, lastName, avatar} = user;

        return (
            <Header className={styles.header}>
                <span className={styles.trigger} onClick={this.props.toggle}>
                    <Icon type={this.props.collapsed ? "menu-unfold" : "menu-fold"}/>
                </span>

                <div className={styles.right}>
                    <Tooltip title="Help" className={styles.help}>
                        <span>
                            <Icon type="question-circle" style={{fontSize: "18px"}}/>
                        </span>
                    </Tooltip>
                    <Tooltip title="Search" className={styles.search}>
                        <span>
                            <Icon type="search" style={{fontSize: "18px"}}/>
                        </span>
                    </Tooltip>

                    <Dropdown overlay={this.rightMenu}>
                        <div className={styles.dropdown}>
                            <Avatar src={avatar ? avatar['100x100'] : defaultAvatar} className={styles.avatarImage}/>
                            <span>{firstName + " " + lastName}</span>
                        </div>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

export default AdminHeader;
