import axios from 'axios';
import { StorageServices } from '../helpers/auth.helper';
import { LoginResponse } from '@/features/Login/model/login.type';

export const $api = axios.create({
    baseURL: import.meta.env._API_URL_,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${StorageServices.getAccessTokensFromStorage()}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log(error.config);
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<LoginResponse>(`${import.meta.env?._API_URL_}/auth/login/refresh`,
                { refreshToken: StorageServices.getRefreshTokenFromStorage() });
            StorageServices.setTokensToStorage(response.data)
            return $api.request(originalRequest);
        } catch (e) {
            //StorageServices.clearStorage();
        }
    }
    throw error;
})
