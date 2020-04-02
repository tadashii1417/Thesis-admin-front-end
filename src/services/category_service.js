import axios from '../config/axios-config';

export async function fetchCategories() {
    return axios.get('/api/course-categories');
}

export async function createNewCategory(body) {
    return axios.post('/api/course-categories', body);
}

export async function deleteCategory(id) {
    return axios.delete('/api/course-categories/' + id);
}

export async function updateCategory(id, patch) {
    return axios.patch('/api/course-categories/' + id, patch);
}