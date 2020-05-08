import axios from '../config/axios-config';

export function createUser(values) {
    return axios.post('/api/users', values);
}