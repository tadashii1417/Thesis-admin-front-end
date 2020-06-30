import React, {Component} from "react";
import {Typography, Divider, message, Alert, Icon} from "antd";
import BankQuestions from "../../../components/BankQuestions/BankQuestion";
import {
    exportBankQuestionsByCategoryId,
    exportBankQuestionsByQuestionIds,
    getExportResult
} from "../../../services/question_bank_service";
import {setIntervalImmediate} from "../../../utils/lang_util";
import config from "../../../config";
import {TaskStatus} from "../../../constants/task_constant";
import {downloadFile} from "../../../utils/file_util";

const {Title} = Typography;

class BankQuestionsPage extends Component {
    state = {
        selectedQuestions: [],
        selectedCategory: null,
        taskId: null,
        status: null
    }

    intervalId = 0;

    rowSelection = {
        onChange: (selectedRowKeys) => {
            this.setState({selectedQuestions: selectedRowKeys});
        }
    }

    setSelectedCategory = (id) => {
        this.setState({selectedCategory: id});
    }

    handleExportQuestion = async () => {
        const {selectedCategory, selectedQuestions} = this.state;
        const key = "export-question";
        try {
            let res;
            if (selectedQuestions.length > 0) {
                res = await exportBankQuestionsByQuestionIds(selectedQuestions);
            } else if (selectedCategory !== null) {
                res = await exportBankQuestionsByCategoryId(selectedCategory);
            } else {
                return;
            }

            this.setState({taskId: res.data.id});
            this.intervalId = await setIntervalImmediate(
                this.fetchExportProcess,
                config.exportQuestionBank
            );
        } catch (e) {
            message.error({content: "Something went wrong", key});
        }
    }

    fetchExportProcess = async () => {
        if (!this.state.taskId) return;

        try {
            const {data} = await getExportResult(this.state.taskId);
            switch (data.status) {
                case TaskStatus.CREATED:
                    this.setState({status: TaskStatus.CREATED});
                    break;
                case TaskStatus.FINISHED:
                    this.setState({status: TaskStatus.FINISHED});
                    await downloadFile(data.result);
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

    render() {
        const {status, selectedQuestions, selectedCategory} = this.state;
        let exportInfo = "";

        if (status === TaskStatus.CREATED) {
            exportInfo = <Alert
                message="Questions are being exported"
                type="info"
                icon={<Icon type="loading"/>}
                showIcon
            />;
        }

        if (status === TaskStatus.FAILED) {
            exportInfo = <Alert
                message="Error"
                type="error"
                showIcon
            />
        }

        return (
            <div>
                <Title level={4}>Question Bank</Title>
                <Divider/>

                <div style={{margin: '15px 0 15px 0'}}>
                    {exportInfo}
                </div>

                <BankQuestions
                    showActions={true}
                    showExport={selectedQuestions.length > 0 || selectedCategory != null}
                    setSelectedCategory={this.setSelectedCategory}
                    handleExportQuestions={this.handleExportQuestion}
                    rowSelection={this.rowSelection}/>
            </div>
        );
    }
}

export default BankQuestionsPage;
