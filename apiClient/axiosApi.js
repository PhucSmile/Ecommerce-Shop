import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosApi.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// axiosApi.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

export default axiosApi;
