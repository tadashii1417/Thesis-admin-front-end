import videoAxios from "../config/axios-video";
import axios from "../config/axios-config";

export async function uploadVideo(file, moduleId, config) {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("moduleId", moduleId);
    return videoAxios.post('/api/processes', formData, config);
}

export async function getProgress(moduleId) {
    return videoAxios.get('/api/processes?moduleId=' + moduleId);
}

export async function terminateProcess(processId) {
    return videoAxios.patch(`/api/processes/${processId}/terminate`);
}

export async function deleteProcess(processId) {
    return videoAxios.delete(`/api/processes/${processId}`);
}

export async function setVideoUrl(url, moduleId) {
    return axios.post('/api/videos', {url, moduleId});
}