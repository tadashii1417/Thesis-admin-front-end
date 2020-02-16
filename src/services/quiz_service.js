import axios from "../axios-config";

export async function createNewQuiz(moduleId) {
    return axios.post('/api/quizzes', {moduleId: moduleId});
}

export async function fetchQuizConfig(moduleId) {
    return axios.get('/api/quizzes/' + moduleId);
}

export async function updateQuizConfig(moduleId, patch) {
    return axios.patch('/api/quizzes/' + moduleId, patch);
}