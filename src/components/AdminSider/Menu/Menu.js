import React from "react";
import menuConfig from "./menu_config";
import {Link} from 'react-router-dom';
import {Menu, Icon} from "antd";
import styles from "./Menu.module.css";
import {checkIsAdmin} from "../../../utils/permision_util";

const {SubMenu} = Menu;

export default function menu({user}) {
    const isAdmin = user ? checkIsAdmin(user.type): false;

    const loadMenu = menuConfig.map(menuItem => {
        if (menuItem.routes.length) {
            return (
                <SubMenu key={menuItem.name}
                         title={<span><Icon type={menuItem.icon} className={styles.icon}/>
                                            <span>{menuItem.display}</span></span>}>
                    {menuItem.routes.map(subItem => (
                        <Menu.Item key={subItem.name}>
                            <span>{subItem.display}</span>
                            <Link to={subItem.path}/>
                        </Menu.Item>
                    ))}
                </SubMenu>
            );
        }

        let smenu = (
            <Menu.Item key={menuItem.name}>
                <Icon type={menuItem.icon} className={styles.icon}/>
                <span>{menuItem.display}</span>
                <Link to={menuItem.path}/>
            </Menu.Item>);

        if (!menuItem.onlyAdmin || isAdmin) return smenu;
        return "";
    });

    return <Menu theme="dark" mode="inline" className={styles.menu}>
        {loadMenu}
    </Menu>
};

