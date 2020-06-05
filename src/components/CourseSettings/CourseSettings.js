import {
    Button,
    Divider,
    Form,
    Icon,
    Input,
    InputNumber, message, Radio,
    Select,
    Tooltip,
    TreeSelect
} from "antd";
import React from "react";
import {fetchCategories} from "../../services/category_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {createPatch} from "../../utils/patch_util";
import {getAllSemesters} from "../../services/semester_service";

const {TextArea} = Input;
const {Option} = Select;
const {TreeNode} = TreeSelect;


class CourseSettingsBasic extends React.Component {
    state = {
        categories: [],
        semesters: []
    };

    async componentDidMount() {
        try {
            const {data: categories} = await fetchCategories();
            const {data: semesters} = await getAllSemesters();

            this.setState({categories: categories, semesters: semesters});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong when fetching categories");
                }
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {isFieldTouched, validateFieldsAndScroll} = this.props.form;
        let patch = [];

        validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                this.props.handleUpdateCourse(patch);

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
        const max = keys[keys.length - 1] + 1;
        const nextKeys = keys.concat(max);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    createCategoryTreeNode = (categories) => {
        if (categories === undefined) return;
        return categories.map(child => (
            <TreeNode key={child.id} title={child.title} value={child.id}>
                {this.createCategoryTreeNode(child.subcategories)}
            </TreeNode>
        ));
    };


    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {categories} = this.state;
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

        const outcomes = data.learningOutcomes.length;
        const newKeys = [...Array(outcomes).keys()];

        getFieldDecorator('keys', {initialValue: newKeys});
        const keys = getFieldValue('keys');
        const learningOutcomes = keys.map((k, index) => (
            <Form.Item {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                       label={index === 0 ? 'Learning outcomes' : ''}
                       key={k}>
                {getFieldDecorator(`learningOutcomes[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue: data.learningOutcomes[k],
                    rules: [{required: true, message: "Please input learning outcome or delete this field.",},],
                })(<Input placeholder="learning outcome" style={{width: '60%', marginRight: 8}}/>)}

                {keys.length > 1 && (
                    <Icon className="dynamic-delete-button"
                          type="minus-circle-o"
                          onClick={() => this.removeOutcome(k)}/>
                )}

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
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label={<span> Course slug
                    <Tooltip title={"Course short name for URL"}>
                        <Icon type="info-circle-o" style={{marginLeft: 4}}/>
                    </Tooltip></span>}>
                    {getFieldDecorator('slug', {
                        initialValue: data.slug,
                        rules: [{required: true, message: 'Please input course slug.'}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label={"Course Category"}>
                    {getFieldDecorator('categoryId', {
                        rules: [],
                        initialValue: data.categoryId
                    })(<TreeSelect style={{width: '80%'}}>
                        {this.createCategoryTreeNode(categories)}
                    </TreeSelect>)}
                </Form.Item>

                <Form.Item
                    label={"Course Semester"}>
                    {getFieldDecorator('semesterId', {
                        rules: [],
                        initialValue: data.semester && data.semester.id
                    })(<Select style={{width: '80%'}}>
                        {this.state.semesters.map(m =>
                            <Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>)}
                    </Select>)}
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

                <Form.Item label={<span> Course estimate time
                    <Tooltip title={"Total estimate time in hours"}>
                        <Icon type="info-circle-o" style={{marginLeft: 4}}/>
                    </Tooltip></span>}>
                    {getFieldDecorator('amountOfTime', {
                        initialValue: data.amountOfTime,
                    })(<InputNumber min={0}/>)}
                </Form.Item>

                <h4>Course Descriptions</h4>
                <Divider style={{margin: '12px 0 24px'}}/>

                <Form.Item label={"Course description"}>
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                        rules: [{required: true, message: "Please input course description"}]
                    })(<TextArea style={{height: '100px'}}/>)}
                </Form.Item>

                <Form.Item label={"Course requirements"}>
                    {getFieldDecorator('requirements', {
                        initialValue: data.requirements,
                        rules: [{required: true, message: "Please input course requirement"}]
                    })(<TextArea style={{height: '75px'}}/>)}
                </Form.Item>

                <Form.Item label={"Course promotional video"}>
                    {getFieldDecorator('promoVideoUrl', {
                        initialValue: data.promoVideoUrl,
                    })(<Input/>)}
                </Form.Item>

                {learningOutcomes}

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