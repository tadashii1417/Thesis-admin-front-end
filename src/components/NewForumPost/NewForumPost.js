import React, {Component} from "react";
import {Button, Form, Input} from "antd";
import {Editor} from "lerna-rte";

const FormItem = Form.Item;

class ForumPost extends Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, {title, content}) => {
            if (!err) {
                this.props.handleNewPost(title, content);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit}>
                <FormItem label={"Title"}>
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true
                        }]
                    })(<Input/>)}
                </FormItem>

                <FormItem label={"Content"}>
                    {getFieldDecorator('content', {
                        rules: [{
                            required: true
                        }]
                    })(<Editor/>)}
                </FormItem>

                <FormItem>
                    <Button type={"primary"} htmlType={"submit"}> Add Post </Button>
                </FormItem>
            </Form>
        );
    }
}

const NewForumPost = Form.create({name: 'new_forum_post'})(ForumPost);

export default NewForumPost;
