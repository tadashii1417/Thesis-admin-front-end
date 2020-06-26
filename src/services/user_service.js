import axios from '../config/axios-config';

export function createUser(values) {
    return axios.post('/api/users', values);
}

export function getUsers(pageSize) {
    return axios.get('/api/users?pageSize=' + pageSize);
}

export function getUser(id) {
    return axios.get('/api/users/' + id);
}

export function searchUser(text) {
    return axios.get(`/api/users/search?q=${text}`);
}

export function importUser(file) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/api/users/import', formData);
}
