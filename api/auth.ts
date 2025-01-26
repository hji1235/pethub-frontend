import axios from 'axios';
import { saveAccessToken } from '../utils/storage';

const BASE_URL = 'http://192.168.0.7:8080';

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`,
            { email, password },
            { withCredentials: true }  // 쿠키 저장을 위해 설정
        );

        if (response.status === 200) {
            await saveAccessToken(response.headers['authorization']);
            return true;
        }
    } catch (error) {
        console.error('로그인 실패:', error);
        return false;
    }
};

export const refreshAccessToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/reissue`,
            { withCredentials: true }
        );
        if (response.status === 200) {
            await saveAccessToken(response.headers['authorization']);
            return true;
        }
    } catch (error) {
        console.error('토큰 갱신 실패:', error);
        return false;
    }
};

