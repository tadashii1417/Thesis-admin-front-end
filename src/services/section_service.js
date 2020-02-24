import axios from '../axios-config';

export async function updateSection(id, patch) {
    return axios.patch('/api/sections/' + id, patch);
}

export async function deleteSection(id) {
    return axios.delete('/api/sections/' + id);
}