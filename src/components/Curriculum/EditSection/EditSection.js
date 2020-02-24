import React from "react";
import {Button, Form, Input, message} from "antd";
import {createPatch} from "../../../utils/patch_util";
import {httpErrorHandler} from "../../../utils/axios_util";
import {updateSection} from "../../../services/section_service";

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

                try{
                    const {data} = await updateSection(this.props.data.id, patch);
                    this.props.data.title = data.title;
                    this.props.data.description = data.description;
                    message.success("Section has been updated");
                    this.props.closeModal();
                }catch (e) {
                    console.log(e);
                    httpErrorHandler(e, ()=>{
                       switch (e.code) {
                           default:
                               message.error("Something went wrong");
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
                    })(
                        <TextArea/>
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