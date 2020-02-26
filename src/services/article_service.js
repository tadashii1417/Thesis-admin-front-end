import axios from '../axios-config';

export function createNewArticle(moduleId, body = {}) {
    body.moduleId = moduleId;
    body.content = {
        html: "this is an example",
        deltas: []
    };
    return axios.post('/api/articles', body);
}

export function updateArticle(moduleId, patch) {
    return axios.patch('/api/articles/'+ moduleId, patch);
}