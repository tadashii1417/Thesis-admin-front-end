import React from "react";
import {Breadcrumb, Icon} from "antd";
import {Link} from "react-router-dom";

export default function ({courseSlug, courseName, moduleTitle, moduleLink, postTitle}) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to={"/courses"}>
                    <Icon type={'home'} style={{marginRight: '7px'}}/>
                    Courses
                </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <Link to={`/courses/${courseSlug}`}>{courseName}</Link>
            </Breadcrumb.Item>

            {!postTitle ?
                <Breadcrumb.Item>{moduleTitle}</Breadcrumb.Item> :
                (<>
                    <Breadcrumb.Item>
                        <Link to={moduleLink}>{moduleTitle}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{postTitle}</Breadcrumb.Item>
                </>)
            }
        </Breadcrumb>);
}