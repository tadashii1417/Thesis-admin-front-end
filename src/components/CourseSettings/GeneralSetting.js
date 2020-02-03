import {Button, Checkbox, Col, DatePicker, Form, Icon, Input, Row, Select, TreeSelect} from "antd";
import React from "react";
import styles from './PublicCard.module.css';

const {Option} = Select;
const treeData = [
    {
        title: 'Development',
        description: "",
        slug: "development",
        count: 10,
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Web development',
                description: "",
                slug: "web-development",
                count: 10,
                value: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'Javascript',
                        description: "javascript",
                        slug: "javascript",
                        count: 10,
                        value: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: 'React JS',
                        description: "",
                        slug: "react-js",
                        count: 10,
                        value: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                ]
            },
            {
                title: 'Mobile Apps',
                description: "",
                slug: "mobile-apps",
                count: 10,
                value: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: 'Business',
        description: "",
        slug: "business",
        count: 10,
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Finance',
                description: "",
                slug: "finance",
                count: 10,
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Entrepreneurship',
                description: "entrepreneurship",
                slug: "",
                count: 10,
                value: '0-1-1',
                key: '0-1-1',
            }
        ]
    },
];
const tags = ['css', 'html', 'javascript', 'web', 'python', 'socket'];
const teachers = ['tadashii1417', 'hieu123', 'hao123'];

const tagOptions = tags.map((tag) => (
    <Option key={tag}>{tag}</Option>
));
const teacherOptions = teachers.map((teacher) => (
    <Option key={teacher}>{teacher}</Option>
));
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Visibility">
                    {getFieldDecorator('email', {
                        rules: [],
                    })(
                        <Select defaultValue="private">
                            <Option value="public">Public</Option>
                            <Option value="private">Private</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Course Type">
                    {getFieldDecorator('password', {
                        rules: [],
                    })(<Select defaultValue="online">
                        <Option value="offline">Offline</Option>
                        <Option value="online">Online</Option>
                    </Select>)}
                </Form.Item>


                <Form.Item label="Opening day">
                    {getFieldDecorator('opening', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(<DatePicker/>)}
                </Form.Item>

                <Form.Item label="Price">
                    {getFieldDecorator('price', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(<Input type={"number"}/>)}
                </Form.Item>

                <Form.Item
                    label={"Course Category"}
                    className={styles.formItem}>
                    {getFieldDecorator('category', {
                        rules: []
                    })(
                        <TreeSelect treeData={treeData}/>
                    )}
                </Form.Item>

                <Form.Item
                    label={"Course Tags"}
                    className={styles.formItem}>
                    {getFieldDecorator('tags', {
                        rules: []
                    })(
                        <Select
                            mode="tags"
                            defaultValue={['html', 'css']}
                        >{tagOptions}</Select>
                    )}
                </Form.Item>
                <Form.Item
                    label={"Course Teachers"}
                    className={styles.formItem}>
                    {getFieldDecorator('teacher', {
                        rules: []
                    })(
                        <Select
                            mode="tags"
                            defaultValue={['tadashii']}
                        >{teacherOptions}</Select>
                    )}
                </Form.Item>

                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{required: true, message: 'Please input the captcha you got!'}],
                            })(<Input/>)}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);
export default WrappedRegistrationForm;