import axios from '../config/axios-config';

export function createForum(moduleId, intro = "") {
    return axios.post('/api/forums', {moduleId, intro});
}

export function getForumPosts(moduleId, page = 1, sort = 'oldest') {
    return axios.get(`/api/forums/${moduleId}/posts?sort=${sort}&page=${page}`);
}

export function createForumPosts(moduleId, title, content) {
    return axios.post(`/api/forums/${moduleId}/posts`, {title, content});
}

export function getPostComments(postId) {
    return axios.get(`/api/posts/${postId}/answers`);
}

export function addComment(postId, content) {
    return axios.post(`/api/posts/${postId}/answers`, {content})
}