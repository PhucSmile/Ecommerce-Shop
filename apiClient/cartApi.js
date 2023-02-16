import axiosApi from './axiosApi';
export const cartApi = {
    getCart(id) {
        return axiosApi.get(`/carts/${id}`);
    },
    getCartUser(id) {
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
