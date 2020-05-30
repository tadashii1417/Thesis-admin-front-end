import axios from "../config/axios-config";

export function updateAvatar(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return axios.put('/api/me/avatar', formData);
}

export function updateProfile(patch) {
    return axios.patch('/api/me/profile', patch);
}

export function updateUsername(username) {
    return axios.patch('/api/me/username', {username});
}

export function updatePassword(oldPassword, newPassword) {
    return axios.patch('/api/me/password', {oldPassword, newPassword});
}

export function forgotPassword(source, email) {
    return axios.post('/api/me/password/forgot', {source, email});
}

export function resetPassword(email, sig, deadline) {
    return axios.post(`/api/me/password/reset?email=${email}&sig=${sig}&deadline=${deadline}`);
}