import axios from '../config/axios-config';

export async function fetchCategories() {
    return axios.get('/api/course-categories');
}

export async function createNewCategory(body) {
    const formData = new FormData();
    formData.append('slug', body.slug);
    formData.append('title', body.title);
    formData.append('parentId', body.parentId);
    if (body.icon) {
        formData.append('icon', body.icon.file.originFileObj);
    }
    return axios.post('/api/course-categories', formData);
}

export async function updateCategoryIcon(id, file) {
    const formData = new FormData();
    formData.append('icon', file);
    return axios.patch(`/api/course-categories/${id}/icon`, formData);
}

export async function deleteCategory(id) {
    return axios.delete('/api/course-categories/' + id);
}

export async function updateCategory(id, patch) {
    return axios.patch('/api/course-categories/' + id, patch);
}
