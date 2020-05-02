import axios from '../config/axios-config';

export function createResource(moduleId, file) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('moduleId', moduleId);

    return axios.post('/api/resources', formData);
}