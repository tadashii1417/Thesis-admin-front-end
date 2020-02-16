import axios from 'axios';
import {getToken} from "./utils/storage_util";

const instance = axios.create({
    baseURL: '/',
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