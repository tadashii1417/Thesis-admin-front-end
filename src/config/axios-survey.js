import axios from 'axios';
import {getToken} from "../utils/storage_util";

// const proxy = 'http://10.130.48.178';
const proxy = 'http://localhost';
// const proxy = 'http://192.168.20.12';

const instance = axios.create({
    baseURL: `${proxy}:8000/`,
    timeout: 7500
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
});

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (!error.response) {
            const error = new Error("No internet connection");
            return Promise.reject(error);
        }

        if (error.response.status === 500) {
            const error = new Error("Internal server error");
            error.status = 500;

            return Promise.reject(error);
        }

        return Promise.reject(error.response.data.error);
    }
);

export default instance;
