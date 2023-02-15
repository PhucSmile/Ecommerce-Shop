import { authApi } from '@/api/authApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useAuthRegisterApi = () => {
    return useMutation(authApi.register);
};

export const useAuth = (id) => {
    return useQuery({
        queryKey: [`get-profile-user-login`],
        queryFn: () => authApi.getUserLogin(id),
        enabled: !!id,
    });
};

export const useEditProfileApi = (id) => {
    return useMutation((data) => {
        return Promise.all([authApi.edit(id, data)]);
    });
};
