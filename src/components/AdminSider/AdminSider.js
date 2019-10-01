import React from "react";
import styles from "./AdminSider.module.css";
import { Layout } from "antd";
import logo from "../../assets/logo.svg";
import AdminMenu from "./Menu/Menu";

const { Sider } = Layout;

const adminSider = props => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    breakpoint="lg"
    width={256}
    theme="dark"
    className={styles.sider}
  >
    <div className={styles.logo} id="logo">
      <img src={logo} alt="logo" />
      <h1>Admin Board</h1>
    </div>

    <AdminMenu />
  </Sider>
);

export default adminSider;
