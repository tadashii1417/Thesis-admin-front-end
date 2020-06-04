import axios from '../config/axios-config';

export function getSurveyQuestions() {
    return axios.get('/api/survey-questions/');
}

export function updateSurveyQuestion(id, patch) {
    return axios.patch(`/api/survey-questions/${id}`, patch);
}

export function createSurveyQuestions(body) {
    return axios.post('/api/survey-questions/', body);
}

export function deleteSurveyQuestion(id) {
    return axios.delete(`/api/survey-questions/${id}`);
}