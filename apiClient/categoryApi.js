import axiosApi from './axiosApi';
export const categoryApi = {
    getAllCategories() {
        return axiosApi.get('/products/categories');
    },
    get(params) {
        return axiosApi.get(`/products/category/${params.category}/?limit=${params.limit}`);
    },
    getFilter(params) {
        return axiosApi.get(`/products/category/${params.category}/?limit=12&skip=${params.skip || 0}`);
    },
};
