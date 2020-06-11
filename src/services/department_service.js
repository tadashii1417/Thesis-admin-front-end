import axios from '../config/axios-config';

export function getAllDepartments() {
    return axios.get('/api/departments');
}

export function getSpecificDepartment(id) {
    return axios.get('/api/departments/' + id);
}

export function createDepartment(body) {
    return axios.post('/api/departments', body);
}

export function updateDepartment(id, patch) {
    return axios.patch(`/api/departments/${id}`, patch);
}

export function deleteDepartment(id) {
    return axios.delete('/api/departments/' + id);
}

export function addUserToDepartment(departmentId, userId) {
    return axios.post(`/api/departments/${departmentId}/users/${userId}`);
}

export function removeUserFromDepartment(departmentId, userId) {
    return axios.delete(`/api/departments/${departmentId}/users/${userId}`);
}
