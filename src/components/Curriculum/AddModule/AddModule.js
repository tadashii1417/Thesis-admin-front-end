import React from "react";
import {Icon} from 'react-icons-kit';
import ModulesConfig from '../ModulesConfig';
import {Button,  Form, Input, Radio} from "antd";
import {ModuleType} from "../../../constants/module_constant";

const {TextArea} = Input;

class NewModuleBasic extends React.Component {
    state = {
        forumIntro: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleNewModule(values);
            }
        });
    };

    handleChangeModuleType = (e) => {
        switch (e.target.value) {
            case ModuleType.LIVESTREAM:
                this.setState({showLivestream: true, forumIntro: false});
                break;
            case ModuleType.FORUM:
                this.setState({showLivestream: false, forumIntro: true});
                break;
            default:
                this.setState({showLivestream: false, forumIntro: false});
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {forumIntro} = this.state;
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

        let forum = "";

        if (forumIntro) {
            forum = (<Form.Item label="Forum Introduction">
                {getFieldDecorator('intro')(
                    <TextArea/>
                )}
            </Form.Item>);
        }

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: "Please input module title"}]
                    })(<Input/>)}
                </Form.Item>
                {forum}

                <Form.Item label="Type:">
                    {getFieldDecorator('type', {
                        rules: [{required: true, message: "Please select module type"}],
                    })(
                        <Radio.Group style={{width: '100%'}} onChange={this.handleChangeModuleType}>
                            {
                                Object.keys(ModulesConfig).map(key => {
                                        if (key === ModuleType.SURVEY) return "";
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
