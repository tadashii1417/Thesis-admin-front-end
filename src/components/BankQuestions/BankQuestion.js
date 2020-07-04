import React, {Component} from "react";
import {Table, Icon, message, TreeSelect, Dropdown, Menu, Upload, Alert} from "antd";
import {Button, Divider, Modal} from "antd";
import {Link} from "react-router-dom";
import {EditorContent} from "lerna-rte";

import styles from './BankQuestion.module.css';
import {
    deleteBankQuestion,
    getAllBankQuestions,
    getBankQuestionByCategory, getImportResult,
    importBankQuestionFromLerna, importBankQuestionFromMoodle
} from "../../services/question_bank_service";
import {getQuestionCategoryTree} from "../../services/question_category_service";
import {QuestionTypeMapping} from "../../constants/quiz_constant";
import Loading from "../Loading/Loading";
import {ImportSource} from "../../constants/question_bank_constant";
import {TaskStatus} from "../../constants/task_constant";
import {setIntervalImmediate} from "../../utils/lang_util";
import config from "../../config";

const {TreeNode} = TreeSelect;
const {confirm} = Modal;

class BankQuestions extends Component {
    state = {
        loading: true,
        loadTable: false,
        questions: [],
        categories: [],
        fileList: [],
        selectedSource: null,
        taskId: null,
        status: null
    }

    intervalId = 0;

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
        if (this.props.setSelectedCategory) {
            this.props.setSelectedCategory(e);
        }
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
            render: (content) => <EditorContent content={content} isInline={true}/>
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

    handleOnChangeUpload = ({fileList}) => {
        let nFileList = [...fileList];
        nFileList = nFileList.slice(-1);
        this.setState({fileList: nFileList})
    };

    handleImportQuestions = async ({file}) => {
        const key = "import-questions";
        message.loading({content: "Loading ...", key});
        try {
            let res;
            switch (this.state.selectedSource) {
                case ImportSource.LERNA:
                    res = await importBankQuestionFromLerna(file);
                    break;
                case ImportSource.MOODLE:
                    res = await importBankQuestionFromMoodle(file);
                    break;
                default:
                    return;
            }
            this.intervalId = await setIntervalImmediate(
                this.fetchImportProcess,
                config.importQuestionBank
            );
            this.setState({taskId: res.data.id});
        } catch (e) {
            message.error({content: "Something went wrong", key});
        }
    }

    fetchImportProcess = async () => {
        if (!this.state.taskId) return;

        try {
            const {data} = await getImportResult(this.state.taskId);
            switch (data.status) {
                case TaskStatus.CREATED:
                    this.setState({status: TaskStatus.CREATED});
                    break;
                case TaskStatus.FINISHED:
                    this.setState({status: TaskStatus.FINISHED, loadTable: true});
                    const {data: questions} = await getAllBankQuestions();
                    this.setState({questions: questions, loadTable: false});
                    clearInterval(this.intervalId);
                    break;
                case TaskStatus.FAILED:
                    this.setState({status: TaskStatus.FAILED});
                    clearInterval(this.intervalId);
                    break;
                default:
                    clearInterval(this.intervalId);
            }
        } catch (e) {
            clearInterval(this.intervalId);
            message.error('Fetch export data failed.');
        }
    }

    importMenu = (
        <Menu onClick={e => this.setState({selectedSource: e.key})}>
            <Menu.Item key={ImportSource.MOODLE}>
                <Upload
                    multiple={false}
                    customRequest={this.handleImportQuestions}
                    onChange={this.handleOnChangeUpload}
                    showUploadList={false}
                    fileList={this.state.fileList}
                    defaultFileList={this.state.fileList}>
                    Import from Moodle
                </Upload>
            </Menu.Item>

            <Menu.Item key={ImportSource.LERNA}>
                <Upload
                    multiple={false}
                    customRequest={this.handleImportQuestions}
                    onChange={this.handleOnChangeUpload}
                    showUploadList={false}
                    fileList={this.state.fileList}
                    defaultFileList={this.state.fileList}>
                    Import from Lerna
                </Upload>
            </Menu.Item>
        </Menu>
    );


    render() {
        const {loading, questions, status} = this.state;
        if (loading) return <Loading/>;

        const {rowSelection, showActions, showExport, handleExportQuestions} = this.props;
        const treeNodes = this.genChildren(this.state.categories);

        let actions = <span>&nbsp;</span>;
        if (showActions) {
            actions = (
                <div>
                    <Link to={"/new-question"}>
                        <Button icon="plus" type="primary">
                            New question
                        </Button>
                    </Link>

                    <Divider type="vertical"/>
                    <Dropdown trigger={["click"]} overlay={this.importMenu}>
                        <Button>
                            <Icon type="upload"/> Import ...
                        </Button>
                    </Dropdown>

                    <Divider type="vertical"/>
                    {showExport &&
                    <Button onClick={handleExportQuestions}>
                        <Icon type="download"/> Export
                    </Button>
                    }
                </div>
            );
        }

        let importResult = "";
        if (status === TaskStatus.CREATED) {
            importResult = <Alert
                message="Questions are being imported"
                type="info"
                icon={<Icon type="loading"/>}
                showIcon
            />;
        }

        if (status === TaskStatus.FINISHED) {
            importResult = <Alert
                message="Questions has been imported."
                type="success"
                showIcon
            />;
        }

        if (status === TaskStatus.FAILED) {
            importResult = <Alert
                message="Error"
                type="error"
                showIcon
            />
        }

        return (
            <div className={styles.container}>

                <div className={styles.toolbar}>
                    {actions}

                    <TreeSelect
                        style={{width: '300px'}}
                        allowClear
                        onChange={this.handleChangeCategory}
                        placeholder="Categories">
                        {treeNodes}
                    </TreeSelect>
                </div>

                <div style={{margin: '10px 0'}}>
                    {importResult}
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
