import {Icon} from "antd";
import React from "react";

const DynamicIcon = (props) => <Icon component={props.mIcon} {...props} />;

export default DynamicIcon;