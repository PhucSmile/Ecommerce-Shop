import { cartApi } from '@/api/cartApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCartApi = (id) => {
    return useQuery({
        queryKey: ['get-cart'],
        queryFn: () => cartApi.get(id),
        keepPreviousData: true,
    });
};

export const useAddCartApi = () => {
    const queryClient = useQueryClient();
    return useMutation(cartApi.add, {
        onSuccess: () => {
            queryClient.refetchQueries();
        },
        onError: (err) => {},
    });
};

export const useEditCartApi = (id) => {
    const queryClient = useQueryClient();
    return useMutation(cartApi.edit, {
        onSuccess: () => {
            queryClient.refetchQueries();
        },
        onError: (err) => {},
    });
};

export const useDeleteCartApi = (id) => {
    const queryClient = useQueryClient();
    return useMutation(cartApi.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['get-cart'],
                queryFn: () => cartApi.get(id),
                keepPreviousData: true,
            });
        },
    });
};
