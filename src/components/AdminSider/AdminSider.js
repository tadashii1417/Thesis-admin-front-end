import React from "react";
import styles from "./AdminSider.module.css";
import {Layout} from "antd";
import logo from "../../assets/logo.svg";
import AdminMenu from "./Menu/Menu";
import {Link} from "react-router-dom";

const {Sider} = Layout;

const adminSider = props => (
    <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        breakpoint="md"
        collapsedWidth='0'
        width={256}
        theme="dark"
        className={styles.sider}
    >
        <div className={styles.logo} id="logo">
            <Link to={"/"}>
                <img src={logo} alt="logo"/>
                <h1>Admin Board</h1>
            </Link>
        </div>

        <AdminMenu/>
    </Sider>
);

export default adminSider;
