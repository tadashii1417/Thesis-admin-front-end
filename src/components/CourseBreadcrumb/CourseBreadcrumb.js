import React from "react";
import {Breadcrumb, Icon} from "antd";
import {Link} from "react-router-dom";

export default function ({courseSlug, courseName, moduleTitle}) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to={"/courses"}>
                    <Icon type={'home'} style={{marginRight: '7px'}}/>
                    Courses
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={`/courses/${courseSlug}`}>
                    {courseName}
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{moduleTitle}</Breadcrumb.Item>
        </Breadcrumb>);
}