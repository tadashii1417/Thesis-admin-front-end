import React from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

export default function () {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to={'/courses'}><Button type="primary">Back Home</Button></Link>}
        />
    );
}