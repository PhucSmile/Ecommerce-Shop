import axiosApi from './axiosApi';
export const productApi = {
    getAll() {
        return axiosApi.get('/products');
    },
    getLimit(params) {
        return axiosApi.get(`/products/?limit=${params}`);
    },
    getDetail(id) {
        return axiosApi.get(`/products/${id}`);
    },
};
