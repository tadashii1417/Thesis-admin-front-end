import React from "react";
import {Icon} from 'react-icons-kit';
import ModulesConfig from '../ModulesConfig';
import {Button, Form, Input, Radio} from "antd";

class NewModuleBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleNewModule(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const radioStyle = {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '30px',
            border: '1px solid #e8e8e8',
            margin: '5px 0',
            padding: '20px',
            fontSize: '17px',
        };
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Module Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: "Please input module title"}]
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="Module type:">
                    {getFieldDecorator('type', {
                        rules: [{required: true, message: "Please select module type"}],
                    })(
                        <Radio.Group style={{width: '100%'}}>
                            {
                                Object.keys(ModulesConfig).map(key => {
                                        const config = ModulesConfig[key];
                                        return (<Radio key={key} value={key} style={radioStyle}>
                                            <Icon icon={config.icon} size={16}
                                                  style={{color: config.color, margin: "0 25px"}}/>
                                            {config.title}
                                        </Radio>);
                                    }
                                )
                            }
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const NewModule = Form.create({name: "add_module_form"})(NewModuleBasic);

export default NewModule;