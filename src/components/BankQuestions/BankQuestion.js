import React, {Component} from "react";
import {Table, Icon, message, TreeSelect} from "antd";
import {Button, Divider, Modal} from "antd";
import {Link} from "react-router-dom";
import {EditorContent} from "doodle-editor";

import styles from './BankQuestion.module.css';
import {deleteBankQuestion, getAllBankQuestions, getBankQuestionByCategory} from "../../services/question_bank_service";
import {getQuestionCategoryTree} from "../../services/question_category_service";
import {QuestionTypeMapping} from "../../constants/quiz_constant";
import Loading from "../Loading/Loading";

const {TreeNode} = TreeSelect;
const {confirm} = Modal;

class BankQuestions extends Component {
    state = {
        loading: true,
        loadTable: false,
        questions: [],
        categories: []
    }

    async componentDidMount() {
        try {
            const {data} = await getAllBankQuestions();
            const {data: categories} = await getQuestionCategoryTree();
            this.setState({questions: data, loading: false, categories: categories});
        } catch (e) {
            message.error("Fetch questions failed");
        }
    }

    genChildren = (childs) => {
        if (childs === undefined || childs === null) return;
        return childs.map(child => (
            <TreeNode key={child.id} title={child.name} value={child.id}>
                {this.genChildren(child.subcategories)}
            </TreeNode>
        ));
    };

    handleChangeCategory = async (e) => {
        this.setState({loadTable: true});
        if (e === undefined) {
            const {data} = await getAllBankQuestions();
            this.setState({questions: data, loadTable: false});
        } else {
            const {data} = await getBankQuestionByCategory(e);
            this.setState({questions: data, loadTable: false});
        }
    }

    showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this question?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                const key = "delete";
                try {
                    message.loading({content: "Loading ...", key});
                    await deleteBankQuestion(id);
                    let updatedQuestion = [...this.state.questions];
                    updatedQuestion = updatedQuestion.filter(question => question.id !== id);
                    this.setState({questions: updatedQuestion});
                    message.success({content: "Question has been deleted", key})
                } catch (e) {
                    message.error({content: "Something went wrong", key});
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    columns = [
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: (content, row) => <Link to={'/questions/' + row.id}>
                <EditorContent content={content} isInline={true}/>
            </Link>
        },
        {
            title: "Mark",
            dataIndex: "mark",
            key: "mark"
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "questionCategory.name"
        },
        {
            title: "Type",
            key: "type",
            dataIndex: "type",
            render: type => QuestionTypeMapping[type]
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Link to={'/questions/' + record.id}>
                            <Icon type="edit" theme="twoTone"/>
                        </Link>
                        <Divider type="vertical"/>
                        <Icon type="delete"
                              theme="twoTone"
                              onClick={() => this.showDeleteConfirm(record.id)}
                              twoToneColor="#eb2f96"/>
                    </div>
                );
            }
        }
    ];

    render() {
        const {loading, questions} = this.state;
        if (loading) return <Loading/>;

        const {rowSelection} = this.props;
        const treeNodes = this.genChildren(this.state.categories);

        return (
            <div className={styles.container}>

                <div className={styles.toolbar}>
                    <Link to={"/new-question"}>
                        <Button icon="plus" type="primary">
                            New question
                        </Button>
                    </Link>

                    <TreeSelect
                        style={{width: '300px'}}
                        allowClear
                        onChange={this.handleChangeCategory}
                        placeholder="Categories">
                        {treeNodes}
                    </TreeSelect>
                </div>

                <Table loading={this.state.loadTable}
                       columns={this.columns}
                       rowSelection={rowSelection}
                       dataSource={questions}
                       className="stripe-table"
                       rowKey="id"/>
            </div>
        );
    }
}

export default BankQuestions;
