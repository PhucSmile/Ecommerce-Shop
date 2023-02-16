import { cartApi } from '@/apiClient/cartApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCartApi = (id) => {
    return useQuery({
        queryKey: ['get-cart'],
        queryFn: () => cartApi.getCart(id),
        enabled: !!id,
    });
};

export const useGetCartUserApi = (id) => {
    return useQuery({
        queryKey: ['get-cart-user'],
        queryFn: () => cartApi.getCartUser(id),
        enabled: !!id,
    });
};

export const useAddCartApi = () => {
    return useMutation(cartApi.add);
};

export const useEditCartApi = (id) => {
    return useMutation((data) => {
        return Promise.all([cartApi.edit(id, data)]);
    });
};

export const useDeleteCartApi = (id) => {
    return useMutation(cartApi.delete);
};
