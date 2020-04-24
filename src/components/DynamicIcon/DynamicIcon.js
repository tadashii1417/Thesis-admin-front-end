import {Icon} from "antd";
import React from "react";

const DynamicIcon = (props) => <Icon component={props.micon} {...props} />;

export default DynamicIcon;