import axios from '../config/axios-config';

export function createAnnouncement(moduleId, content) {
    return axios.post('/api/announcements', {moduleId, content})
}

export function updateAnnouncement(moduleId, patch) {
    return axios.patch(`/api/announcements/${moduleId}`, patch);
}

export function sendNotification(moduleId) {
    return axios.post(`/api/announcements/${moduleId}/email`);
}