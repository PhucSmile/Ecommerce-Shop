import axiosApi from './axiosApi';
export const categoryApi = {
    get(params) {
        return axiosApi.get(`/products/category/${params.category}/?limit=${params.limit}`);
    },
    getAllCategories() {
        return axiosApi.get('/products/categories');
    },
};
