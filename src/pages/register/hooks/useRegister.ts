import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import type { RegisterRequest } from '@/types/api';

const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard', { replace: true });
    },
  });
};
export default useRegister;
