import axios from '../config/axios-config';

export function createForum(moduleId, intro = "") {
    return axios.post('/api/forums', {moduleId, intro});
}

export function getForumPosts(moduleId, page = 1, sort = 'oldest') {
    return axios.get(`/api/forums/${moduleId}/posts?sort=${sort}&page=${page}`);
}

