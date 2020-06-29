import axios from '../config/axios-config';

export function getAllBankQuestions() {
    return axios.get('/api/bank-questions');
}

export function getBankQuestionByCategory(categoryId) {
    return axios.get(`/api/bank-questions/category/${categoryId}`);
}

export function getSpecificQuestion(questionId) {
    return axios.get(`/api/bank-questions/${questionId}`);
}

export function insertBankQuestion(questionData) {
    return axios.post('/api/bank-questions', questionData);
}

export function deleteBankQuestion(questionId) {
    return axios.delete(`/api/bank-questions/${questionId}`);
}

export function updateBankQuestion(questionId, questionData) {
    return axios.put(`/api/bank-questions/${questionId}`, questionData);
}

export function importBankQuestionFromMoodle(file) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`/api/bank-questions/import?source=moodle`, formData);
}

export function importBankQuestionFromLerna(file) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`/api/bank-questions/import?source=lerna`, formData);
}

export function getImportResult(id) {
    return axios.get('/api/tasks/' + id);
}

export function exportBankQuestionsByQuestionIds(questions) {
    const query = questions.map(id => "questionIds=" + id).join('&');
    return axios.post(`/api/bank-questions/export?${query}`);
}

export function exportBankQuestionsByCategoryId(id) {
    return axios.post(`/api/bank-questions/export?categoryId=${id}`);
}

export function getExportResult(id) {
    return axios.get('/api/tasks/' + id);
}
