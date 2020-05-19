import axios from '../config/axios-config';

export function createResource(moduleId, files) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file.originFileObj);
    })
    formData.append('moduleId', moduleId);

    return axios.post('/api/resources', formData);
}