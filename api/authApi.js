import axiosApi from './axiosApi';
export const authApi = {
    login(data) {
        return axiosApi.post('/auth/login', data);
    },
    register(data) {
        return axiosApi.post('/users', data);
    },
    getUserLogin(id) {
        return axiosApi.get(`/users/${id}`);
    },
    edit(id, data) {
        return axiosApi.put(`/users/${id}`, data);
    },
};
