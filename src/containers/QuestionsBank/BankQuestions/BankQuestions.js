import React, {Component} from "react";
import {Table, Icon, message} from "antd";
import styles from './BankQuestions.module.css';

import {Typography, Button, Divider, Input, Modal} from "antd";
import {Link} from "react-router-dom";
import {deleteBankQuestion, getAllBankQuestions} from "../../../services/question_bank_service";
import Loading from "../../../components/Loading/Loading";
import {EditorContent} from "doodle-editor";
import {QuestionTypeMapping} from "../../../constants/quiz_constant";

const {Title} = Typography;
const {Search} = Input;
const {confirm} = Modal;

class BankQuestions extends Component {
    state = {
        loading: true,
        questions: []
    }

    async componentDidMount() {
        try {
            const {data} = await getAllBankQuestions();
            this.setState({questions: data, loading: false});
        } catch (e) {
            message.error("Fetch questions failed");
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

        return (
            <div>
                <div className={styles.container}>
                    <Title level={4}>Question Bank</Title>
                    <Divider/>
                    <div className={styles.toolbar}>
                        <Link to={"/new-question"}>
                            <Button icon="plus" type="primary">
                                Add new
                            </Button>
                        </Link>
                        <Search
                            placeholder="Search questions"
                            onSearch={value => console.log(value)}
                            className={styles.searchBox}
                            enterButton
                        />
                    </div>
                    <Table columns={this.columns} dataSource={questions} rowKey="id"/>
                </div>
            </div>
        );
    }
}

export default BankQuestions;
