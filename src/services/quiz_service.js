import axios from "../config/axios-config";

export async function createNewQuiz(moduleId) {
    return axios.post('/api/quizzes', {moduleId: moduleId});
}

export async function fetchQuizConfig(moduleId) {
    return axios.get('/api/quizzes/' + moduleId);
}

export async function updateQuizConfig(moduleId, patch) {
    return axios.patch('/api/quizzes/' + moduleId, patch);
}

export async function fetchQuizQuestions(moduleId) {
    return axios.get('/api/quizzes/' + moduleId + '/questions');
}

export async function insertQuizQuestionByHand(moduleId, body) {
    return axios.post('/api/quizzes/' + moduleId + '/questions', body);
}

export async function updateQuizQuestion(id, body) {
    return axios.put('/api/quizzes/questions/' + id, body);
}

export async function deleteQuizQuestion(id) {
    return axios.delete('/api/quizzes/questions/' + id);
}

export async function fetchQuizResult(id) {
    return axios.get(`/api/quizzes/${id}/result`);
}

export async function fetchStudentAttempts(learnerId, moduleId) {
    return axios.get(`/api/attempts?learnerUserId=${learnerId}&quizModuleId=${moduleId}`);
}

export async function fetchSpecificQuizAttempt(attemptId) {
    return axios.get(`/api/attempts/${attemptId}`);
}