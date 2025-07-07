import axios from 'axios';

const apiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
    },
    withCredentials: true,
})

apiBackend.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {apiBackend};