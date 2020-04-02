import axios from "../config/axios-video";

export async function uploadVideo(file, config) {
    const formData = new FormData();
    formData.append("video", file);
    return axios.post('/api/processes', formData, config);
}
