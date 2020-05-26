import React from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";


export default function () {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={'/courses'}><Button type="primary">Back Home</Button></Link>}
        />
    );
}