import { categoryApi } from '@/api/categoryApi';
import { useQuery } from '@tanstack/react-query';

export const useCategoryApi = ({ params, options }) => {
    return useQuery({
        queryKey: [`get-${params.category}`],
        queryFn: () => categoryApi.get(params),
        ...options,
    });
};

export const useAllCategoriesApi = () => {
    return useQuery({
        queryKey: [`get-all-categories`],
        queryFn: categoryApi.getAllCategories,
    });
};
