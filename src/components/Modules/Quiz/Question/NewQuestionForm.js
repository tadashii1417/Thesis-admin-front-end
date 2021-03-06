import React from "react";
import {
    Button,
    Form,
    Select, InputNumber, Icon, message, TreeSelect, Switch
} from "antd";
import {Editor} from 'lerna-rte';
import {QuestionType} from "../../../../constants/quiz_constant";
import ChoiceForm from "../../../Choice/ChoiceForm";
import {removeIdNewChoices, removeUndefined} from "../../../../utils/dev_util";
import {getQuestionCategoryTree} from "../../../../services/question_category_service";

const {Option} = Select;
const {TreeNode} = TreeSelect;

class NewQuestionFormBasic extends React.Component {
    state = {
        keys: [0],
        categories: null
    };

    async componentDidMount() {
        if (this.props.isBankQuestion) {
            try {
                const {data} = await getQuestionCategoryTree();
                this.setState({categories: data});
            } catch (e) {
                message.error("Fetch question categories failed");
            }
        }
    }

    genChildren = (childs) => {
        if (childs === undefined || childs === null) return;
        return childs.map(child => (
            <TreeNode key={child.id} title={child.name} value={child.id}>
                {this.genChildren(child.subcategories)}
            </TreeNode>
        ));
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.choices = removeUndefined(values.choices);
                removeIdNewChoices(values.choices);
                await this.props.addQuestionHandler(values);
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

    render() {
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
            />
        ));

        let questionCategories = null;
        if (this.props.isBankQuestion) {
            const treeNodes = this.genChildren(this.state.categories);

            questionCategories = (
                <Form.Item label={"Question category"}>
                    {getFieldDecorator('questionCategoryId', {})(
                        <TreeSelect
                            style={{width: '50%'}}
                            allowClear
                            placeholder="Categories">
                            {treeNodes}
                        </TreeSelect>
                    )}
                </Form.Item>
            );
        }

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout} hideRequiredMark>
                <Form.Item label="Content">
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: "Please fill in content"}],
                    })(<Editor/>)}
                </Form.Item>

                {questionCategories}

                <Form.Item label="Shuffle Answers">
                    {getFieldDecorator('shuffleAnswers', {})(<Switch/>)}
                </Form.Item>

                <Form.Item label={"Type"}>
                    {getFieldDecorator('type', {
                        initialValue: QuestionType.SINGLE_ANSWER
                    })(
                        <Select style={{width: '250px'}}>
                            <Option value={QuestionType.INPUT}>Fill in the blank</Option>
                            <Option value={QuestionType.MULTIPLE_ANSWER}>Multiple answer</Option>
                            <Option value={QuestionType.SINGLE_ANSWER}>Single answer</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Mark">
                    {getFieldDecorator('mark', {
                        initialValue: 1
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
                        Add question
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const NewQuestionForm = Form.create({name: "new_Question_form"})(NewQuestionFormBasic);

export default NewQuestionForm;
