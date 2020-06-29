import React from "react";
import {Button, Form, Select, InputNumber, Icon, message, TreeSelect} from "antd";
import {Editor} from 'lerna-rte';
import {removeNullId, removeUndefined} from "../../../utils/dev_util";
import Loading from "../../../components/Loading/Loading";
import ChoiceForm from "../../../components/Choice/ChoiceForm";
import {QuestionType} from "../../../constants/quiz_constant";
import {getSpecificQuestion, updateBankQuestion} from "../../../services/question_bank_service";
import {getQuestionCategoryTree} from "../../../services/question_category_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {ServerErrors} from "../../../constants/server_error_constant";

const {Option} = Select;
const {TreeNode} = TreeSelect;

class QuestionEditFormBasic extends React.Component {
    state = {
        data: null,
        keys: [0],
        loading: true,
        categories: []
    };

    async componentDidMount() {
        const {id} = this.props;
        try {
            const {data} = await getSpecificQuestion(id);
            const {data: categories} = await getQuestionCategoryTree();
            const choiceCount = data.choices.length;
            const newKeys = [...Array(choiceCount).keys()];

            this.setState({keys: newKeys, loading: false, data: data, categories: categories});
        } catch (e) {
            message.error("Fetch question failed");
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.choices = removeUndefined(values.choices);
                removeNullId(values.choices);

                const key = "edit-question";
                const {id} = this.state.data;
                try {
                    message.loading({content: "Loading", key});
                    const {data} = await updateBankQuestion(id, values);
                    message.success({content: "Question has been updated.", key});
                    this.setState({data: data});
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            case (ServerErrors.INVALID_FRACTION_SINGLE_ANSWER):
                                message.error({
                                    content: "Single choice must have one option with fraction 1 and others 0",
                                    key
                                });
                                break;
                            case (ServerErrors.INVALID_FRACTION_SUM):
                                message.error({content: "Sum of all options fraction must be 1", key});
                                break;
                            default:
                                message.error({content: "Something went wrong", key});
                        }
                    })
                }
            }
        });
    };

    addOption = () => {
        const len = this.state.keys.length;
        const newKeys = [...this.state.keys];
        newKeys.push(this.state.keys[len - 1] + 1);
        this.setState({keys: newKeys});
    };

    removeOption = (key) => {
        const newKeys = [...this.state.keys];
        const newArray = newKeys.filter(k => k !== key);
        this.setState({
            keys: newArray
        })
    };

    genChildren = (childs) => {
        if (childs === undefined || childs === null) return;
        return childs.map(child => (
            <TreeNode key={child.id} title={child.name} value={child.id}>
                {this.genChildren(child.subcategories)}
            </TreeNode>
        ));
    };

    render() {
        const {data, loading} = this.state;
        if (loading) return <Loading/>;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };

        const {getFieldDecorator} = this.props.form;

        const options = this.state.keys.map((k, index) => (
            <ChoiceForm
                key={k}
                index={index} k={k}
                state={this.state}
                getFieldDecorator={getFieldDecorator}
                removeOption={this.removeOption}
                data={data.choices[k]}
            />
        ));

        const treeNodes = this.genChildren(this.state.categories);

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout} hideRequiredMark>
                <Form.Item label="Content" className={'quiz-content'}>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: "Please fill in content"}],
                        initialValue: data.content
                    })(<Editor/>)}
                </Form.Item>

                <Form.Item label={"Question category"}>
                    {getFieldDecorator('questionCategoryId', {
                        initialValue: data.questionCategoryId
                    })(
                        <TreeSelect
                            style={{width: '50%'}}
                            allowClear
                            placeholder="Categories">
                            {treeNodes}
                        </TreeSelect>
                    )}
                </Form.Item>

                <Form.Item label={"Type"}>
                    {getFieldDecorator('type', {
                        initialValue: data.type
                    })(
                        <Select>
                            <Option value={QuestionType.INPUT}>Fill in the blank</Option>
                            <Option value={QuestionType.MULTIPLE_ANSWER}>Multiple answer</Option>
                            <Option value={QuestionType.SINGLE_ANSWER}>Single answer</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Mark">
                    {getFieldDecorator('mark', {
                        initialValue: data.mark
                    })(<InputNumber/>)}
                </Form.Item>

                <Form.Item label={'Options'} {...formItemLayout}>
                    {options}
                </Form.Item>

                <Form.Item {...formItemLayout} label={<span>&nbsp;&nbsp;</span>}>
                    <Button type="dashed" style={{width: '60%'}} onClick={this.addOption}>
                        <Icon type="plus"/> Add option
                    </Button>
                </Form.Item>

                <Form.Item label={<span>&nbsp;&nbsp;</span>}>
                    <Button type="primary" htmlType="submit">
                        Edit question
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const EditQuestionBankForm = Form.create({name: "question_edit_form"})(QuestionEditFormBasic);

export default EditQuestionBankForm;
