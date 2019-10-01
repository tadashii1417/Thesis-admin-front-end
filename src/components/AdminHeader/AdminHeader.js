import React from "react";
import { Layout, Menu, Icon, Dropdown, Avatar, Tooltip } from "antd";
import styles from "./AdminHeader.module.css";
const { Header } = Layout;

const rightMenu = (
  <Menu className={styles.menu} selectedKeys={[]}>
    <Menu.Item key="userCenter">
      <Icon type="user" />
      <span>Account Center</span>
    </Menu.Item>
    <Menu.Item key="userinfo">
      <Icon type="setting" />
      <span>Account Setting</span>
    </Menu.Item>
    <Menu.Item key="triggerError">
      <Icon type="solution" />
      <span>Profile</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>Logout</span>
    </Menu.Item>
  </Menu>
);
const avatar =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const adminHeader = props => (
  <Header className={styles.header}>
    <span className={styles.trigger} onClick={props.toggle}>
      <Icon type={props.collapsed ? "menu-unfold" : "menu-fold"} />
    </span>

    <div className={styles.right}>
      <Tooltip title="Help">
        <span>
          <Icon type="question-circle" style={{ fontSize: "18px" }} />
        </span>
      </Tooltip>
      <Tooltip title="Search">
        <span>
          <Icon type="search" style={{ fontSize: "18px" }} />
        </span>
      </Tooltip>

      <Dropdown overlay={rightMenu}>
        <div className={styles.dropdown}>
          <Avatar src={avatar} className={styles.avatarImage} />
          <span>Jack Ma</span>
        </div>
      </Dropdown>
    </div>
  </Header>
);

export default adminHeader;
