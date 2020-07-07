import React, {Component} from 'react';
import styles from './Categories.module.css';
import {Icon, Typography, Divider, Table, Modal, message, Upload} from 'antd';
import CategoryForm from './Form/CategoryForm';
import {httpErrorHandler} from "../../utils/axios_util";
import {
    createNewCategory,
    deleteCategory,
    fetchCategories,
    updateCategory,
    updateCategoryIcon
} from "../../services/category_service";
import {ServerErrors} from "../../constants/server_error_constant";
import Loading from "../Loading/Loading";

const EditCategory = React.lazy(() => import("./Form/EditCategory"));

const {Title} = Typography;
const {confirm} = Modal;

export default class extends Component {
    state = {
        categories: [],
        loading: true,
        editModal: false,
        selected: null,
        fileList: [],
    };

    handleOnChangeUpload = ({fileList}) => {
        let nFileList = [...fileList];
        nFileList = nFileList.slice(-1);
        this.setState({fileList: nFileList})
    };

    handleUpdateIcon = async (file, id) => {
        const key = "update-icon";
        message.loading({content: "Loading ...", key});
        try {
            await updateCategoryIcon(id, file);
            const {data} = await fetchCategories();
            this.setState({categories: data});
        } catch (e) {
            message.error({content: "Something went wrong", key});
        }
    }

    columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, row) => <span>
                {row.icon && <img src={row.icon['50x50']} style={{width: '20px', height: '20px'}}
                                  alt="icon"/>} {title}
            </span>
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            width: '30%',
            key: 'slug',
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
                        <Divider type="vertical"/>
                        <Upload
                            multiple={false}
                            customRequest={(options) => this.handleUpdateIcon(options.file, row.id)}
                            onChange={this.handleOnChangeUpload}
                            showUploadList={false}
                            fileList={this.state.fileList}
                            defaultFileList={this.state.fileList}>
                            <Icon type="picture" theme={"twoTone"}
                                  style={{cursor: "pointer"}}
                                  twoToneColor={'#52c41a'}/>
                        </Upload>
                    </div>
                );
            }
        }
    ];

    async componentDidMount() {
        try {
            const {data} = await fetchCategories();
            this.setState({categories: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    handlerCancel = () => {
        this.setState({editModal: false});
    };

    handleNewCategory = async (body) => {
        const key = "new-category";
        try {
            message.loading({content: "Loading", key});
            await createNewCategory(body);
            const {data} = await fetchCategories();
            message.success({content: "New category has been created", key});
            this.setState({categories: data});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.SLUG_ALREADY_EXISTS:
                        message.error({content: "Slug already exist", key});
                        break;
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
            await updateCategory(id, patch);
            const {data} = await fetchCategories();
            message.success({content: "Category has been updated", key});
            this.setState({categories: data, editModal: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.CATEGORY_NOT_FOUND:
                        message.error({content: "Category not found", key});
                        break;
                    case ServerErrors.SLUG_ALREADY_EXISTS:
                        message.error({content: "Slug already exist", key});
                        break;
                    default:
                        message.error({content: "Title already exist", key});
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
                try {
                    await deleteCategory(id);
                    const {data} = await fetchCategories();
                    this.setState({categories: data});
                } catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error("Something went wrong");
                        }
                    })
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
                <Title level={4}>Course Categories</Title>
                <Divider/>
                <div className={styles.container}>

                    <div className={styles.left}>
                        <div className={styles.addTitle}>Add New Course Category</div>
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
                       onCancel={this.handlerCancel}
                       title="Edit Category !">
                    <React.Suspense fallback={"loading ..."}>
                        <EditCategory categories={categories}
                                      handleEditCategory={this.handleEditCategory}
                                      data={this.state.selected}/>
                    </React.Suspense>
                </Modal>
            </div>
        );
    }
}
