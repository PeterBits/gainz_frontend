import { useQuery } from '@tanstack/react-query';

import { exercisesApi } from '@/lib/api';

export const useExercises = () => {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const response = await exercisesApi.getAll();
      return response.data.data;
    },
  });
};
