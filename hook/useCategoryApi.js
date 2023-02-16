import { categoryApi } from '@/apiClient/categoryApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCategoryApi = ({ params, options }) => {
    return useQuery({
        queryKey: [`get-${params.category}`],
        queryFn: () => categoryApi.get(params),
        enabled: !!params.category,
    });
};

export const useFilterCategoryApi = () => {
    return useMutation(categoryApi.getFilter);
};

export const useAllCategoriesApi = () => {
    return useQuery({
        queryKey: [`get-all-categories`],
        queryFn: categoryApi.getAllCategories,
    });
};
