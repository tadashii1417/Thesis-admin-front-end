import axios from '../config/axios-config';

export function createLivestream(
    moduleId,
    params
) {
    return axios.post('/api/livestreams', {moduleId, ...params});
}

export function startLivestream(moduleId) {
    return axios.post(`/api/livestreams/${moduleId}/start`);
}

export function endLivestream(moduleId) {
    return axios.post(`/api/livestreams/${moduleId}/end`);
}

export function joinLivestream(moduleId) {
    return axios.post(`/api/livestreams/${moduleId}/join`);
}

export function getLivestreamPlayback(moduleId) {
    return axios.get(`/api/livestreams/${moduleId}/playback`);
}
