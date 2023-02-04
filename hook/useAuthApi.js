import { authApi } from '@/api/authApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useAuthRegisterApi = () => {
    return useMutation(authApi.register);
};

export const useAuth = ({ id, status }) => {
    return useQuery({
        queryKey: [`get-profile-user-login`],
        queryFn: () => (status = 'authenticated' ? authApi.getUserLogin(id) : null),
    });
};
