import React, {Component} from 'react';
import {Button, DatePicker, Form} from "antd";
import {Editor} from 'lerna-rte';
import config from "../../../config";
import moment from "moment";
import {createPatch} from "../../../utils/patch_util";


class AssignmentFormBasic extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {validateFields, isFieldTouched} = this.props.form;

        const patch = [];
        validateFields((err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                this.props.handleEditAssignment(patch);
            }
        });
    };

    render() {
        const {data} = this.props;

        const {getFieldDecorator} = this.props.form;
        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 19}} layout={"vertical"} onSubmit={this.handleSubmit}>

                <Form.Item label="Description">
                    {getFieldDecorator('intro', {
                        initialValue: data.intro,
                        rules: [{required: true, message: 'Please input description.'}]
                    })(<Editor/>)}
                </Form.Item>

                <Form.Item label="Open at">
                    {getFieldDecorator('openAt', {
                        initialValue: data.openAt ? moment(data.openAt, config.timeFormat) : null
                    })(
                        <DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>
                    )}
                </Form.Item>

                <Form.Item label="Close at">
                    {getFieldDecorator('closeAt', {
                        initialValue: data.closeAt ? moment(data.closeAt, config.timeFormat) : null
                    })(
                        <DatePicker showTime placeholder="Select Time" format={config.timeFormat}/>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

const EditAssignmentForm = Form.create({name: 'edit_assignment_form'})(AssignmentFormBasic);

export default EditAssignmentForm;
