import {
    Button, Divider, Form, Icon, Input, InputNumber, message, Radio, Select, Tooltip, TreeSelect, Upload
} from "antd";
import React from "react";
import {httpErrorHandler} from "../../utils/axios_util";
import {createCourse} from "../../services/course_service";
import ServerErrors from "../../constants/server_error_constant";
import {withRouter} from "react-router";

const {TextArea} = Input;
const {Option} = Select;
const {Dragger} = Upload;
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
const teachers = ['teacher1', 'teacher2', 'teacher3'];

const tagOptions = tags.map((tag) => (
    <Option key={tag}>{tag}</Option>
));
const teacherOptions = teachers.map((teacher) => (
    <Option key={teacher}>{teacher}</Option>
));

let id = 1;

class NewCourseForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log('Received values of categoryForm: ', values);
                try {
                    await createCourse(values);
                    message.success("Create course successfully .");
                    this.props.history.push('/courses');
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            case ServerErrors.INVALID_COURSE_DATA:
                                message.error(e.details);
                                break;
                            case ServerErrors.SLUG_ALREADY_EXISTS:
                                message.error(e.message);
                                break;
                            default:
                                message.error("Create course fail")
                        }
                    })
                }
            }
        });
    };

    removeOutcome = k => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    addOutcome = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 6},
            },
        };

        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k) => (
            <Form.Item {...formItemLayoutWithOutLabel} key={k}>
                {getFieldDecorator(`learningOutcomes[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            message: "Please input learning outcome or delete this field.",
                        },
                    ],
                })(
                    <Input placeholder="learning outcome" style={{width: '60%', marginRight: 8}}/>)}
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeOutcome(k)}
                />
            </Form.Item>
        ));

        return (
            <Form {...formItemLayout}>
                <h3>General Setting</h3>
                <Divider style={{margin: '12px 0 24px'}}/>
                <Form.Item label={"Course full name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input new course name'}]
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label={
                    <span>
                    Course slug <Tooltip title={"Course short name for URL"}>
                        <Icon type="info-circle-o" style={{marginLeft: 4}}/>
                    </Tooltip>
                    </span>}>
                    {getFieldDecorator('slug', {
                        rules: [{required: true, message: 'Please input course slug.'}]
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item
                    label={"Course Category"}>
                    {getFieldDecorator('category', {
                        rules: []
                    })(
                        <TreeSelect treeData={treeData} style={{width: '80%'}}/>
                    )}
                </Form.Item>

                <Form.Item label="Course Type">
                    {getFieldDecorator('type', {
                        rules: [],
                        initialValue: 'online'
                    })(<Select style={{width: '50%'}}>
                        <Option value="offline">Offline</Option>
                        <Option value="online">Online</Option>
                    </Select>)}
                </Form.Item>

                <Form.Item label="Price">
                    {getFieldDecorator('price', {initialValue: 0})(<InputNumber/>)}
                </Form.Item>
                <Form.Item label="List Price">
                    {getFieldDecorator('listPrice', {initialValue: 0})(<InputNumber/>)}
                </Form.Item>

                <Form.Item label="Visibility">
                    {getFieldDecorator('visibility', {
                        rules: [],
                        initialValue: 'invisible'
                    })(
                        <Radio.Group>
                            <Radio value={'visible'}>
                                Visible
                            </Radio>
                            <Radio value={'invisible'}>
                                Invisible
                            </Radio>
                        </Radio.Group>
                    )}
                </Form.Item>

                <Form.Item label={"Course Tags"}>
                    {getFieldDecorator('tags', {
                        rules: []
                    })(
                        <Select mode="tags" style={{width: '80%'}}>{tagOptions}</Select>
                    )}
                </Form.Item>

                <Form.Item label={"Course Teachers"}>
                    {getFieldDecorator('teacher', {
                        rules: []
                    })(
                        <Select mode="tags" style={{width: '80%'}}>{teacherOptions}</Select>
                    )}
                </Form.Item>

                <h3>Course Descriptions</h3>
                <Divider style={{margin: '12px 0 24px'}}/>

                <Form.Item label={"Course description"}>
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: "Please input course description"}]
                    })(
                        <TextArea style={{height: '100px'}}/>
                    )}
                </Form.Item>

                <Form.Item label={"Course requirements"}>
                    {getFieldDecorator('requirements', {
                        rules: [{required: true, message: "Please input course requirement"}]
                    })(
                        <TextArea style={{height: '75px'}}/>
                    )}
                </Form.Item>

                <Form.Item label={"Course image"} extra={"Only image file type accepted: JPEG, JPG"}>
                    {getFieldDecorator('banner', {})(
                        <Dragger>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>,
                    )}
                </Form.Item>

                <Form.Item label={"Learning outcome"}>
                    {getFieldDecorator(`learningOutcomes[${0}]`, {})(
                        <Input placeholder={"learning outcome"}/>)}
                </Form.Item>

                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addOutcome} style={{width: '60%'}}>
                        <Icon type="plus"/> Add learning outcome
                    </Button>
                </Form.Item>

                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleSubmit}>
                        Create course
                    </Button>
                    <Button style={{marginLeft: '10px'}}>Cancel</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNewCourseForm = Form.create({name: 'new-course'})(NewCourseForm);
export default withRouter(WrappedNewCourseForm);