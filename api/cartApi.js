import axiosApi from './axiosApi';
export const cartApi = {
    get(id) {
        return axiosApi.get(`/carts/user/${id}`);
    },
    add(data) {
        return axiosApi.post('/carts/add', data);
    },
    edit(id, data) {
        return axiosApi.patch(`/carts/${id}`, data);
    },
    delete(id) {
        return axiosApi.delete(`/carts/${id}`);
    },
};
