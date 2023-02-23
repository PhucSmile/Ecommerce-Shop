import { productApi } from '@/apiClient/productApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProductApi = () => {
    return useQuery({
        queryKey: ['get-all-products'],
        queryFn: productApi.getAll,
    });
};

export const useProductLimitApi = (params) => {
    return useQuery({
        queryKey: ['get-limit-products'],
        queryFn: () => productApi.getLimit(params),
    });
};

export const useDetailProductApi = (id) => {
    return useQuery({
        queryKey: [`get-detail-product`, id],
        queryFn: () => productApi.getDetail(id),
        keepPreviousData: true,
    });
};

export const useSearchApi = () => {
    return useMutation(productApi.search);
};
