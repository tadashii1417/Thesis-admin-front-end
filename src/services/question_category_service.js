import axios from '../config/axios-config';

export function getQuestionCategoryTree() {
    return axios.get('/api/question-categories/');
}

export function createQuestionCategory(body) {
    return axios.post('/api/question-categories', body);
}

export function updateQuestionCategory(categoryId, patch) {
    return axios.patch(`/api/question-categories/${categoryId}`, patch);
}

export function deleteQuestionCategory(categoryId) {
    return axios.delete(`/api/question-categories/${categoryId}`);
}
