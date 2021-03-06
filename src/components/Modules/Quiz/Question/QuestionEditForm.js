import React from "react";
import {
    Button,
    Form,
    Select, InputNumber, Icon, Divider, Switch
} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";
import ChoiceForm from "../../../Choice/ChoiceForm";
import {removeNullId, removeUndefined} from "../../../../utils/dev_util";
import {Editor} from 'lerna-rte';
import Loading from "../../../Loading/Loading";

const {Option} = Select;

class QuestionEditFormBasic extends React.Component {
    state = {
        keys: [0],
        loading: true,
    };

    componentDidMount() {
        let {data} = this.props;
        const choiceCount = data.choices.length;
        const newKeys = [...Array(choiceCount).keys()];
        this.setState({keys: newKeys, loading: false});
    }

    handleSubmit = e => {
        e.preventDefault();
        const {data} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.choices = removeUndefined(values.choices);
                removeNullId(values.choices);
                this.props.editQuestionHandler(data.id, values);
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
        if (this.state.loading) return <Loading/>;
        const {data} = this.props;

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
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout} hideRequiredMark>
                <Form.Item label="Content" className={'quiz-content'}>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: "Please fill in content"}],
                        initialValue: data.content
                    })(<Editor/>)}
                </Form.Item>

                <Form.Item label="Shuffle Answers">
                    {getFieldDecorator('shuffleAnswers', {
                        valuePropName: 'checked',
                        initialValue: data.shuffleAnswers
                    })(<Switch/>)}
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
                    <Divider type={'vertical'}/>
                    <Button onClick={this.props.handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const QuestionEditForm = Form.create({name: "question_edit_form"})(QuestionEditFormBasic);

export default QuestionEditForm;
