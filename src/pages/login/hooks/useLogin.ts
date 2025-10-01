import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import type { LoginRequest } from '@/types/api';

const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard', { replace: true });
    },
  });
};
export default useLogin;
