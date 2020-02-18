import React from "react";
import {
    Button,
    Form,
    Input,
    Select, InputNumber, Icon, Spin
} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";
import ChoiceForm from "../../../Choice/ChoiceForm";

const {Option} = Select;
const {TextArea} = Input;

class QuestionEditFormBasic extends React.Component {
    state = {
        keys: [0],
        loading: true,
        data: {}
    };

    componentDidMount() {
        let {data} = this.props;
        const choiceCount = data.quizChoices.length;
        const newKeys = [...Array(choiceCount).keys()];
        this.setState({keys: newKeys, loading: false});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            const choiceCount = nextProps.data.quizChoices.length;
            const newKeys = [...Array(choiceCount).keys()];
            return {
                keys: newKeys,
                loading: false,
                data: nextProps.data
            }
        } else {
            return null;
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // values.choices = removeUndefined(values.choices);
                // this.props.addQuestionHandler(values);
            }
        });
    };

    addOption = () => {
        console.log(this.state.keys);
        const len = this.state.keys.length;
        const newKeys = [...this.state.keys];
        newKeys.push(this.state.keys[len - 1] + 1);
        console.log("newkey", newKeys);
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
        if (this.state.loading) {
            return <Spin/>
        }
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
                data={data.quizChoices[k]}
            />
        ));
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label="Content">
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: "Please fill in content"}],
                        initialValue: data.content
                    })(
                        <TextArea/>
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
                    })(
                        <InputNumber/>
                    )}
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

const QuestionEditForm = Form.create({name: "question_edit_form"})(QuestionEditFormBasic);

export default QuestionEditForm;