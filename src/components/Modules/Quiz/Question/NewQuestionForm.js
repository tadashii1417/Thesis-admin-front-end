import React from "react";
import {
    Button,
    Form,
    Input,
    Select, InputNumber, Icon, Spin
} from "antd";
import {QuestionType} from "../../../../constants/quiz_constant";
import ChoiceForm from "../../../Choice/ChoiceForm";
import {removeUndefined} from "../../../../utils/dev_util";

const {Option} = Select;
const {TextArea} = Input;

class NewQuestionFormBasic extends React.Component {
    state = {
        keys: [0]
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.choices = removeUndefined(values.choices);
                this.props.addQuestionHandler(values);
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
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} {...formItemLayout}>
                <Form.Item label="Content">
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: "Please fill in content"}],
                    })(
                        <TextArea/>
                    )}
                </Form.Item>

                <Form.Item label={"Type"}>
                    {getFieldDecorator('type', {
                        initialValue: QuestionType.SINGLE_ANSWER
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
                        initialValue: 1
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
                        Add question
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const NewQuestionForm = Form.create({name: "new_Question_form"})(NewQuestionFormBasic);

export default NewQuestionForm;