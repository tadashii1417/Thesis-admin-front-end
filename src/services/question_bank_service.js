import axios from '../config/axios-config';

export function getAllBankQuestions() {
    return axios.get('/api/bank-questions');
}

export function getBankQuestionByCategory(categoryId) {
    return axios.get(`/api/bank-questions/category/${categoryId}`);
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
