import axios from '../config/axios-config';

export function createUser(values) {
    return axios.post('/api/users', values);
}

export function searchUser(text) {
    return axios.get(`/api/users/search?q=${text}`);
}