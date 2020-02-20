import React from "react";
import {Col, Form, Icon, Input, Row, Slider} from "antd";
import styles from './ChoiceForm.module.css';

const {TextArea} = Input;

export default function (props) {
    const {k, getFieldDecorator, state, removeOption} = props;
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 24},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 24},
        },
    };
    const formItemLayout2 = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 18},
        },
    };

    let {data} = props;
    if (data === undefined) {
        data = {};
        data.id = null;
        data.content = "";
        data.fraction = 0;
        data.correctFeedback = "";
        data.incorrectFeedback = "";
        data.hint = "";
    }

    return (
        <div className={styles.container}>
            <Row>
                <Form.Item style={{display: 'none'}}>
                    {getFieldDecorator(`choices[${k}].id`, {
                        initialValue: data.id,
                    })(<Input/>)}
                </Form.Item>
                <Form.Item
                    {...formItemLayout2}
                    label={'Option content'}
                    style={{marginBottom: '7px'}}
                    key={k}>
                    {getFieldDecorator(`choices[${k}].content`, {
                        initialValue: data.content,
                        rules: [{required: true, message: "Please fill in at least one option."}]
                    })(
                        <TextArea placeholder=""/>)}
                </Form.Item>
            </Row>
            <Row>
                <Form.Item
                    {...formItemLayout2}
                    label={'Fraction'}
                    style={{marginBottom: '7px'}}
                    required={false}
                    key={k}>
                    {getFieldDecorator(`choices[${k}].fraction`, {
                        initialValue: data.fraction
                    })(
                        <Slider max={1} min={0} step={0.1}/>
                    )}
                </Form.Item>
            </Row>
            <Row gutter={2}>
                <Col span={12}>
                    <Form.Item
                        {...formItemLayout}
                        label={'Correct Feedback'}
                        style={{marginBottom: '7px'}}
                        key={k}>
                        {getFieldDecorator(`choices[${k}].correctFeedback`, {
                            initialValue: data.correctFeedback
                        })(
                            <Input placeholder=""/>)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        {...formItemLayout}
                        label={"Incorrect feedback"}
                        style={{marginBottom: '7px'}}
                        required={false}
                        key={k}>
                        {getFieldDecorator(`choices[${k}].incorrectFeedback`, {
                            initialValue: data.incorrectFeedback
                        })(
                            <Input placeholder=""/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item
                    {...formItemLayout2}
                    label={"Hint"}
                    required={false}
                    style={{marginBottom: '7px'}}
                    key={k}>
                    {getFieldDecorator(`choices[${k}].hint`, {
                        initialValue: data.hint
                    })(
                        <Input placeholder=""/>)}
                </Form.Item>
            </Row>

            <Row>
                {state.keys.length > 1 ? (
                    <span style={{color: '#eb2f96', cursor: 'pointer'}} onClick={() => removeOption(k)}>
                        <Icon
                            type="minus-circle"
                            theme={"twoTone"}
                            twoToneColor={"#eb2f96"}
                        /> Delete option
                    </span>

                ) : null}
            </Row>

        </div>
    );
}