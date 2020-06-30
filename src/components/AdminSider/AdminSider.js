import React from "react";
import styles from "./AdminSider.module.css";
import {Layout} from "antd";
import logo from "../../assets/logo.svg";
import AdminMenu from "./Menu/";
import {Link} from "react-router-dom";

const {Sider} = Layout;

const adminSider = props => (
    <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        breakpoint="xs"
        width={256}
        collapsedWidth={0}
        theme="dark"
        className={styles.sider}>

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
