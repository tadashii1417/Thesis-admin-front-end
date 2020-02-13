import axios from "../axios-config";

export async function createNewQuiz(moduleId) {
    return axios.post('/api/quizzes', {moduleId: moduleId});
}