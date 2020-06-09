import axios from '../config/axios-config';
import {DEFAULT_PAGE_SIZE} from "../constants/dev_constant";

export function createForum(moduleId, intro = "") {
    return axios.post('/api/forums', {moduleId, intro});
}

export function getForumPosts(moduleId, page = 1, pageSize = DEFAULT_PAGE_SIZE, sort = 'oldest') {
    return axios.get(`/api/forums/${moduleId}/posts?sort=${sort}&page=${page}&pageSize=${pageSize}`);
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
