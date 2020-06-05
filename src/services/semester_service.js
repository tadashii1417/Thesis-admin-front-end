import axios from "../config/axios-config";

export function getAllSemesters() {
    return axios.get('/api/semesters');
}

export function createNewSemester(body) {
    return axios.post('/api/semesters', body);
}

export function updateSemester(id, patch) {
    return axios.patch(`/api/semesters/${id}`, patch);
}

export function deleteSemester(id) {
    return axios.delete(`/api/semesters/${id}`);
}