import React, {Component} from 'react';
import styles from './QuestionCategories.module.css';
import {Icon, Divider, Table, Modal, message} from 'antd';
import CategoryForm from './Form/QuestionCategoryForm';
import {
    createQuestionCategory,
    deleteQuestionCategory,
    getQuestionCategoryTree, updateQuestionCategory
} from "../../../services/question_category_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import Loading from "../../../components/Loading/Loading";

const {confirm} = Modal;


class QuestionCategories extends Component {
    state = {
        categories: [],
        loading: true,
        editModal: false,
        selected: null
    };

    columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, row) => {
                return (
                    <div>
                        <Icon type="edit" theme="twoTone" onClick={() => {
                            this.setState({selected: row, editModal: true});
                        }}/>
                        <Divider type="vertical"/>
                        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"
                              onClick={() => this.showDeleteConfirm(row.id)}/>
                    </div>
                );
            }
        }
    ];

    async componentDidMount() {
        try {
            const {data} = await getQuestionCategoryTree();
            this.setState({categories: data, loading: false});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    handleCloseEditModal = () => {
        this.setState({editModal: false});
    };

    handleNewCategory = async (body) => {
        const key = "new-category";
        try {
            message.loading({content: "Loading", key});
            await createQuestionCategory(body);
            const {data} = await getQuestionCategoryTree();
            message.success({content: "New category has been created", key});
            this.setState({categories: data});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Title already exist", key});
                }
            })
        }
    };

    handleEditCategory = async (patch) => {
        const {selected} = this.state;
        const {id} = selected;
        const key = "edit-category";

        try {
            message.loading({content: "Loading", key});
            await updateQuestionCategory(id, patch);
            const {data} = await getQuestionCategoryTree();
            message.success({content: "Category has been updated", key});
            this.setState({categories: data, editModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error({content: "Name already exist", key});
                }
            })
        }
    };

    showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this category?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                const key = "delete";
                try {
                    message.loading({content: "Loading ...", key});
                    await deleteQuestionCategory(id);
                    const {data} = await getQuestionCategoryTree();
                    this.setState({categories: data});
                    message.success({content: "Category has been deleted", key})
                } catch (e) {
                    message.error({content: "Something went wrong", key});
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    render() {
        if (this.state.loading) return <Loading/>;

        const {categories} = this.state;

        return (
            <div>
                <h3>Question Bank Categories</h3>
                <Divider/>
                <div className={styles.container}>

                    <div className={styles.left}>
                        <div className={styles.addTitle}>Add New Question Bank Category</div>
                        <CategoryForm categories={categories}
                                      handleNewCategory={this.handleNewCategory}/>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.addTitle}>Current Categories</div>
                        <Table columns={this.columns}
                               dataSource={categories}
                               childrenColumnName={"subcategories"}
                               rowKey={"id"}/>
                    </div>
                    <p style={{clear: 'both'}}/>
                </div>

                <Modal visible={this.state.editModal}
                       footer={null}
                       bodyStyle={{padding: '0 24px 12px 24px'}}
                       onCancel={this.handleCloseEditModal}
                       title="Edit Category !">
                    <CategoryForm categories={categories}
                                  handleEditCategory={this.handleEditCategory}
                                  data={this.state.selected}/>
                </Modal>
            </div>
        );
    }
}

export default QuestionCategories;
