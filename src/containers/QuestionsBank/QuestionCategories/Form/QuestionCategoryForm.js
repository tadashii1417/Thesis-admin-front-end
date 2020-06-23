import React, {Component} from "react";
import {Button, Form, Input, TreeSelect} from "antd";
import {createPatch} from "../../../../utils/patch_util";

const {TreeNode} = TreeSelect;


class CategoryForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const {data, form: {validateFields, isFieldTouched}} = this.props;

        validateFields((err, values) => {
            if (!err) {
                if (!data) {
                    if (values.parentId === null) {
                        delete values.parentId;
                    }
                    this.props.handleNewCategory(values);
                } else {
                    const patch = [];
                    for (let key of Object.keys(values)) {
                        if (isFieldTouched(key)) {
                            createPatch(patch, key, values[key]);
                        }
                    }
                    this.props.handleEditCategory(patch);
                }
            }
        });
    };

    genChildren = (childs) => {
        if (childs === undefined) return;
        return childs.map(child => (
            <TreeNode key={child.id} title={child.name} value={child.id}>
                {this.genChildren(child.subcategories)}
            </TreeNode>
        ));
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categories, data} = this.props;
        const treeNodes = this.genChildren(categories);

        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
                <Form.Item label={"Category Name"}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input category name!'}],
                        initialValue: data ? data.name : ""
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label={"Parent category"}>
                    {getFieldDecorator('parentId', {
                        initialValue: data ? data.id : null
                    })(
                        <TreeSelect
                            style={{width: '100%'}}
                            allowClear
                            placeholder="Parent">
                            {treeNodes}
                        </TreeSelect>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {data ? "Edit Category" : "Add Category"}
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}


const QuestionCategoryForm = Form.create({name: 'question_category_form'})(CategoryForm);

export default QuestionCategoryForm;
