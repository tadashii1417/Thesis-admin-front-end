import React from "react";
import {Button, Form, Input, message, Radio} from "antd";
import {createPatch} from "../../../utils/patch_util";
import {httpErrorHandler} from "../../../utils/axios_util";
import {updateSection} from "../../../services/section_service";
import {SectionVisibility} from "../../../constants/section_contant";

const {TextArea} = Input;


class EditSectionBasic extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        const {validateFields, isFieldTouched} = this.props.form;
        const patch = [];

        validateFields(async (err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                let key = "update-section";

                try {
                    const {data} = await updateSection(this.props.data.id, patch);
                    this.props.data.title = data.title;
                    this.props.data.description = data.description;
                    message.success({content: "Section has been updated", key});
                    this.props.closeModal();
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error({content: "Something went wrong", key});
                        }
                    });
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {data} = this.props;
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Form.Item label="Session Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: "Please input section title"}],
                        initialValue: data.title
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [],
                        initialValue: data.description
                    })(<TextArea/>)}
                </Form.Item>

                <Form.Item label="Visibility">
                    {getFieldDecorator('visibility', {
                        rules: [],
                        initialValue: data.visibility
                    })(
                        <Radio.Group>
                            <Radio value={SectionVisibility.PUBLIC}>
                                Public
                            </Radio>
                            <Radio value={SectionVisibility.PRIVATE}>
                                Private
                            </Radio>
                        </Radio.Group>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}

const EditSection = Form.create({name: "edit_section_form"})(EditSectionBasic);

export default EditSection;