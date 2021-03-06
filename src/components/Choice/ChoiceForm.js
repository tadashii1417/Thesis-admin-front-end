import React from "react";
import {Form, Icon, Input, Row, Slider} from "antd";
import {Editor} from 'lerna-rte';
import styles from './ChoiceForm.module.css';

export default function (props) {
    const {k, getFieldDecorator, state, removeOption} = props;

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
        data.feedback = "";
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
                    className={'choice-content'}
                    key={k}>
                    {getFieldDecorator(`choices[${k}].content`, {
                        initialValue: data.content,
                        rules: [{required: true, message: "Please fill in at least one option."}]
                    })(<Editor/>)}
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
            <Row>
                <Form.Item
                    {...formItemLayout2}
                    label={'Option Feedback'}
                    style={{marginBottom: '7px'}}
                    key={k}>
                    {getFieldDecorator(`choices[${k}].feedback`, {
                        initialValue: data.feedback
                    })(<Editor/>)}
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
