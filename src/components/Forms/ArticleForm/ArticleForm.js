import React from "react";
import {Button, Form} from "antd";
import {Editor} from "lerna-rte";

export default function ({handleUpdate, content, touched, handleContentChange}) {
    return (
        <Form type={"vertical"} onSubmit={handleUpdate}>
            <div className={"article"}>
                <Editor value={content} onChange={handleContentChange}/>
            </div>

            {touched && <div style={{textAlign: 'right', color: '#cf1322'}}>Content has not been saved yet !!!</div>}

            <Form.Item>
                <i>Supported function can be found
                    <a href={'https://katex.org/docs/supported.html'}
                       target={'_blank'}> here</a>
                </i>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"> Update </Button>
            </Form.Item>

        </Form>
    );
}
