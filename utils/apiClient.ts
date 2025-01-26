import axios from 'axios';
import { getAccessToken, removeAccessToken, saveAccessToken } from './storage';
import { refreshAccessToken } from '../api/auth';

const BASE_URL = 'http://192.168.0.7:8080';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  // 리프레시 토큰 쿠키 자동 전송
});

apiClient.interceptors.request.use(async (config) => {
    let token = await getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const success = await refreshAccessToken();
            if (success) {
                error.config.headers['Authorization'] = `Bearer ${await getAccessToken()}`;
                return axios(error.config);
            } else {
                await removeAccessToken();
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
