import {
    Button, DatePicker,
    Divider,
    Form,
    Icon,
    Input,
    InputNumber, message, Radio,
    Select, Switch, TimePicker,
    Tooltip,
    TreeSelect
} from "antd";
import React from "react";
import {fetchCategories} from "../../services/category_service";
import {httpErrorHandler} from "../../utils/axios_util";
import {createPatch} from "../../utils/patch_util";
import {getAllSemesters} from "../../services/semester_service";
import {CourseLevel, CourseType} from "../../constants/course_constant";
import {WeekdayToNumber} from "../../constants/weekdays_contant";
import {convertNumbersToWeekday, convertWeekdaysToNumbers} from "../../utils/course_util";
import moment from "moment";
import config from "../../config";

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
                        switch (key) {
                            case "startTime":
                            case "endTime":
                                createPatch(patch, key, values[key].format('HH:mm'));
                                break;
                            case 'weekdays':
                                createPatch(patch, key, convertWeekdaysToNumbers(values[key]));
                                break;
                            default:
                                createPatch(patch, key, values[key]);
                        }
                    }
                    if (key === "learningOutcomes") {
                        for (let k of values.keys) {
                            if (isFieldTouched(`learningOutcomes[${k}]`)) {
                                createPatch(patch, "learningOutcomes", values.learningOutcomes.filter(n => n));
                                break;
                            }
                        }
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
        const max = keys.length === 0 ? 0 : keys[keys.length - 1] + 1;
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

        if (!data.learningOutcomes) {
            data.learningOutcomes = [];
        }

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
                })(<Input placeholder="Learning outcome" style={{width: '60%', marginRight: 8}}/>)}

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

                <Form.Item label={"Name"}>
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [{required: true, message: 'Please input new course name'}]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label={"Category"}>
                    {getFieldDecorator('categoryId', {
                        rules: [],
                        initialValue: data.categoryId
                    })(<TreeSelect style={{width: '80%'}}>
                        {this.createCategoryTreeNode(categories)}
                    </TreeSelect>)}
                </Form.Item>

                <Form.Item
                    label={"Level"}>
                    {getFieldDecorator('level', {
                        rules: [],
                        initialValue: data.level
                    })(<Select style={{width: '50%'}}>
                            <Option value={CourseLevel.ALL_LEVEL}>All Level</Option>
                            <Option value={CourseLevel.BEGINNER}>Beginner</Option>
                            <Option value={CourseLevel.IMMEDIATE}>Immediate</Option>
                            <Option value={CourseLevel.ADVANCED}>Advanced</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    label={"Semester"}>
                    {getFieldDecorator('semesterId', {
                        rules: [],
                        initialValue: data.semester && data.semester.id
                    })(<Select style={{width: '80%'}}>
                        {this.state.semesters.map(m =>
                            <Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>)}
                    </Select>)}
                </Form.Item>

                <Form.Item label="Type">
                    {getFieldDecorator('type', {
                        rules: [],
                        initialValue: data.type
                    })(<Select style={{width: '50%'}} disabled>
                        <Option value={CourseType.OFFLINE}>Offline</Option>
                        <Option value={CourseType.ONLINE}>Online</Option>
                    </Select>)}
                </Form.Item>

                <Form.Item label="Price">
                    {getFieldDecorator('price', {
                        initialValue: data.priceResult.price.amount
                    })(<InputNumber/>)}
                </Form.Item>

                <Form.Item label="List price">
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

                <Form.Item label="Enrollable">
                    {getFieldDecorator('isEnrollable', {
                        valuePropName: 'checked',
                        initialValue: data.isEnrollable
                    })(<Switch/>)}
                </Form.Item>

                <Form.Item label="Livestream supported">
                    {getFieldDecorator('livestreamSupported', {
                        valuePropName: 'checked',
                        initialValue: data.livestreamSupported
                    })(<Switch/>)}
                </Form.Item>

                <Form.Item label={<span> Estimated duration
                    <Tooltip title={"Total estimated duration in hours"}>
                        <Icon type="info-circle-o" style={{marginLeft: 4}}/>
                    </Tooltip></span>}>
                    {getFieldDecorator('amountOfTime', {
                        initialValue: data.amountOfTime,
                    })(<InputNumber min={0}/>)}
                </Form.Item>

                {data.type === CourseType.OFFLINE && <Form.Item label={"Number of periods"}>
                    {getFieldDecorator('periodCount', {
                        initialValue: data.periodCount,
                    })(<InputNumber min={0}/>)}
                </Form.Item>}

                {data.type === CourseType.OFFLINE &&
                <Form.Item label="Weekdays">
                    {getFieldDecorator('weekdays', {
                        initialValue: convertNumbersToWeekday(data.weekdays)
                    })(<Select mode="multiple">
                            {Object.keys(WeekdayToNumber).map(key => (
                                <Option key={key}>{key}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                }

                {data.type === CourseType.OFFLINE && <Form.Item label={"Location"}>
                    {getFieldDecorator('location', {
                        initialValue: data.location,
                    })(<Input/>)}
                </Form.Item>}

                {data.type === CourseType.OFFLINE && <Form.Item label={"Capacity"}>
                    {getFieldDecorator('capacity', {
                        initialValue: data.capacity,
                    })(<InputNumber min={0}/>)}
                </Form.Item>}

                {data.type === CourseType.OFFLINE &&
                <Form.Item label="Open day">
                    {getFieldDecorator('startAt', {
                        initialValue: data.startAt ? moment(data.startAt, config.timeFormat) : null
                    })(<DatePicker/>)}
                </Form.Item>
                }

                {data.type === CourseType.OFFLINE &&
                <Form.Item label="End day">
                    {getFieldDecorator('endAt', {
                        initialValue: data.endAt ? moment(data.endAt, config.timeFormat) : null
                    })(<DatePicker/>)}
                </Form.Item>
                }

                {data.type === CourseType.OFFLINE &&
                <Form.Item label="Class start time">
                    {getFieldDecorator('startTime', {
                        initialValue: data.startTime ? moment(data.startTime, 'HH:mm') : null
                    })(<TimePicker/>)}
                </Form.Item>
                }

                {data.type === CourseType.OFFLINE &&
                <Form.Item label="Class end time">
                    {getFieldDecorator('endTime', {
                        initialValue: data.endTime ? moment(data.endTime, 'HH:mm') : null
                    })(<TimePicker/>)}
                </Form.Item>
                }

                <h4>Course Descriptions</h4>
                <Divider style={{margin: '12px 0 24px'}}/>

                <Form.Item label={"Description"}>
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                    })(<TextArea rows={3}/>)}
                </Form.Item>

                <Form.Item label={"Short description"}>
                    {getFieldDecorator('shortDescription', {
                        initialValue: data.shortDescription,
                    })(<TextArea rows={2}/>)}
                </Form.Item>

                <Form.Item label={"Requirements"}>
                    {getFieldDecorator('requirements', {
                        initialValue: data.requirements,
                    })(<TextArea rows={3}/>)}
                </Form.Item>

                <Form.Item label={"Promotional video"}>
                    {getFieldDecorator('promoVideoUrl', {
                        initialValue: data.promoVideoUrl,
                    })(<Input/>)}
                </Form.Item>

                <div className="learningOutcomes">
                    {learningOutcomes}
                </div>

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
