import {
    Button,
    Divider,
    Form,
    Icon,
    Input,
    InputNumber, Radio,
    Select,
    Tooltip,
    TreeSelect
} from "antd";
import React from "react";
const {TextArea} = Input;
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

let id = 1;

class CourseSettingsBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of categoryForm: ', values);
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
        const {data} = this.props;
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
                <h4>General Setting</h4>
                <Divider style={{margin: '12px 0 24px'}}/>
                <Form.Item label={"Course full name"}>
                    {getFieldDecorator('name', {
                        initialValue: data.name,
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
                        initialValue: data.slug,
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
                        initialValue: data.type
                    })(<Select style={{width: '50%'}}>
                        <Option value="offline">Offline</Option>
                        <Option value="online">Online</Option>
                    </Select>)}
                </Form.Item>

                <Form.Item label="Price">
                    {getFieldDecorator('price', {
                        initialValue: data.priceResult.price.amount
                    })(<InputNumber/>)}
                </Form.Item>
                <Form.Item label="List Price">
                    {getFieldDecorator('listPrice', {
                        initialValue: data.priceResult.listPrice.amount
                    })(<InputNumber/>)}
                </Form.Item>

                <Form.Item label="Visibility">
                    {getFieldDecorator('visibility', {
                        rules: [],
                        initialValue: data.visibility
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

                <h4>Course Descriptions</h4>
                <Divider style={{margin: '12px 0 24px'}}/>

                <Form.Item label={"Course description"}>
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                        rules: [{required: true, message: "Please input course description"}]
                    })(
                        <TextArea style={{height: '100px'}}/>
                    )}
                </Form.Item>

                <Form.Item label={"Course requirements"}>
                    {getFieldDecorator('requirements', {
                        initialValue: data.requirements,
                        rules: [{required: true, message: "Please input course requirement"}]
                    })(
                        <TextArea style={{height: '75px'}}/>
                    )}
                </Form.Item>

                <Form.Item label={"Learning outcome"}>
                    {getFieldDecorator(`learningOutcomes[${0}]`, {})(
                        <Input placeholder={"learning outcome"}/>)}
                </Form.Item>

{/*// TODO: Display learning outcome to front-end*/}

                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addOutcome} style={{width: '60%'}}>
                        <Icon type="plus"/> Add learning outcome
                    </Button>
                </Form.Item>

                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleSubmit}>
                        Update course
                    </Button>
                    <Button style={{marginLeft: '10px'}}>Cancel</Button>
                </Form.Item>
            </Form>
        );
    }
}

const CourseSettings = Form.create({name: 'course_setting'})(CourseSettingsBasic);
export default CourseSettings;