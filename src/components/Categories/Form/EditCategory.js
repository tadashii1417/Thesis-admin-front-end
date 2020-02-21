import React, {Component} from "react";
import styles from '../Categories.module.css';
import {Button, Form, Input, Tooltip, TreeSelect} from "antd";
import {createPatch} from "../../../utils/patch_util";

const {TreeNode} = TreeSelect;

class EditCategory extends Component {
    state = {
        data: null
    };

    handleSubmit = e => {
        e.preventDefault();
        const {isFieldTouched} = this.props.form;

        const patch = [];

        this.props.form.validateFields((err, values) => {
            if (!err) {
                for (let key of Object.keys(values)) {
                    if (isFieldTouched(key)) {
                        createPatch(patch, key, values[key]);
                    }
                }
                this.props.handleEditCategory(patch);
            }
        });
    };

    genChildren = (childs) => {
        if (childs === undefined) {
            return;
        } else {
            return childs.map(child => (
                <TreeNode key={child.id} title={child.title} value={child.id}>
                    {this.genChildren(child.subcategories)}
                </TreeNode>
            ));
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return {
                data: nextProps.data
            }
        } else {
            return null;
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categories} = this.props;
        const treeNodes = this.genChildren(categories);
        const {data} = this.props;

        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
                <Form.Item label={"Title"} className={styles.formItem}>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please input category title!'}],
                        initialValue: data.title
                    })(
                        <Input/>,
                    )}
                </Form.Item>

                <Form.Item label={
                    <Tooltip
                        title={"The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."}>
                        Slug
                    </Tooltip>
                } className={styles.formItem}>
                    {getFieldDecorator('slug', {
                        rules: [{required: true, message: 'Please input category slug!'}],
                        initialValue: data.slug
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label={"Parent category"} className={styles.formItem}>
                    {getFieldDecorator('parentId', {
                        initialValue: data.parentId ? data.parentId : null
                    })(
                        <TreeSelect
                            style={{width: '100%'}}
                            placeholder="Parent">
                            {treeNodes}
                        </TreeSelect>
                    )}
                </Form.Item>

                <Form.Item style={{width: '100%', textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                        Edit category
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}


const EditCategoryWrapped = Form.create({name: 'edit_category_form'})(EditCategory);
export default EditCategoryWrapped;