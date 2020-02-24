import React from "react";
import {Button, Checkbox, Form, Icon, Input, Radio, Tooltip} from "antd";
import {createPatch} from "../../../utils/patch_util";
import {CurriculumPreviewableModuleType} from "../../../constants/module_constant";

class EditModuleBasic extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const {isFieldTouched, validateFields} = this.props.form;
        const {handleEditModule} = this.props;
        let patch = [];

        validateFields((err, values) => {
            if (!err) {
                console.log(values);
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                handleEditModule(patch);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {data} = this.props;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <Form layout={"vertical"} {...formItemLayout} onSubmit={this.handleSubmit} hideRequiredMark>
                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: "Please input module title"}],
                        initialValue: data.title
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item
                    label={<span> Visibility
                        <Tooltip title={"This module is published or not ?"}>
                            <Icon type="info-circle" style={{marginLeft: '5px'}}/>
                        </Tooltip> </span>}>
                    {getFieldDecorator('visibility', {
                        rules: [{required: true, message: "Please input section title"}],
                        initialValue: data.visibility
                    })(
                        <Radio.Group>
                            <Radio value={'public'}>
                                Public
                            </Radio>
                            <Radio value={'private'}>
                                Private
                            </Radio>
                        </Radio.Group>
                    )}
                </Form.Item>

                {
                    CurriculumPreviewableModuleType.includes(data.type) ?
                        <Form.Item
                            label={<span> Previewable
                        <Tooltip title={"Allow students who didn't enroll the course to view this module or not ?"}>
                            <Icon type="info-circle" style={{marginLeft: '5px'}}/>
                        </Tooltip> </span>}>
                            {getFieldDecorator('previewable', {
                                valuePropName: 'checked',
                                initialValue: data.previewable
                            })(
                                <Checkbox/>
                            )}
                        </Form.Item>: null
                }


                <Form.Item label={<span>&nbsp;</span>}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const EditModule = Form.create({name: "edit_module_form"})(EditModuleBasic);

export default EditModule;