import axios from 'axios';
import { API_URL } from '../utils/api-url';

axios.defaults.baseURL = API_URL;

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        // Do something before request is sent
        // For example, you can add headers, modify request data, etc.
        // config.headers['Authorization'] = 'Bearer ' + yourAuthToken;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

const axxios = axios;

export default axxios;
