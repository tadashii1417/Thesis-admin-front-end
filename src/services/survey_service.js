import axios from '../config/axios-config';
import axiosSurvey from '../config/axios-survey';

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

export function getSurveyResult(courseId) {
    return axiosSurvey.post(`/api/surveys/${courseId}/result`);
}

export function getSurveyResultTask(taskId) {
    return axiosSurvey.get(`/api/tasks/${taskId}`);
}
