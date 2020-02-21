import React, {Component} from "react";
import styles from '../Categories.module.css';
import {Button, Form, Input, Tooltip, TreeSelect} from "antd";

const {TreeNode} = TreeSelect;


class CategoryForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.parentId === undefined){
                    delete values.parentId;
                }
                console.log(values);
                this.props.handleNewCategory(values);
            }
        });
    };

    genChildren= (childs) => {
          if(childs === undefined){
              return;
          }else{
              return childs.map(child => (
                  <TreeNode key={child.id} title={child.title} value={child.id}>
                      {this.genChildren(child.subcategories)}
                  </TreeNode>
              ));
          }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categories} = this.props;
        const treeNodes = this.genChildren(categories);

        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
                <Form.Item label={"Title"} className={styles.formItem}>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please input category title!'}],
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
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label={"Parent category"} className={styles.formItem}>
                    {getFieldDecorator('parentId', {})(
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
                        Add category
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}


const CategoryFormWrapped = Form.create({name: 'category_form'})(CategoryForm);
export default CategoryFormWrapped;