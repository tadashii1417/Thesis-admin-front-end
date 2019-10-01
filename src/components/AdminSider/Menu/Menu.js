import React from "react";
import menuConfig from "./Menu.config";

import { Menu, Icon } from "antd";
import styles from "./Menu.module.css";
const { SubMenu } = Menu;

const loadMenu = menuConfig.map(menuItem => {
  if (menuItem.routes.length) {
    return (
      <SubMenu
        key={menuItem.name}
        title={
          <span>
            <Icon type={menuItem.icon} className={styles.icon} />
            <span>{menuItem.display}</span>
          </span>
        }
      >
        {menuItem.routes.map(subItem => (
          <Menu.Item key={subItem.name}>{subItem.display}</Menu.Item>
        ))}
      </SubMenu>
    );
  } else {
    return (
      <Menu.Item key={menuItem.name}>
        <Icon type={menuItem.icon} className={styles.icon} />
        <span>{menuItem.display}</span>
      </Menu.Item>
    );
  }
});

const menu = props => (
  <Menu theme="dark" mode="inline" className={styles.menu}>
    {loadMenu}
  </Menu>
);

export default menu;
