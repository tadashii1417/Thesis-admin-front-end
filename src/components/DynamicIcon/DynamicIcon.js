import {Icon} from "antd";
import React from "react";

const DynamicIcon = (props) => <Icon component={props.icon} {...props} />;

export default DynamicIcon;
