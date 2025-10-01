import axios from 'axios';

import type {
  CreateRoutineRequest,
  CreateSessionRequest,
  GetExerciseProgressParams,
  GetExercisesResponse,
  GetSessionsParams,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateMetricsRequest,
  UpdateRoutineRequest,
  UpdateSessionRequest,
} from '@/types/api';
import type { Exercise, Routine, User, UserMetrics, WorkoutSession } from '@/types/entities';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login for 401 errors on protected routes
    // Don't redirect if the error is from login/register endpoints
    const isAuthEndpoint =
      error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  register: (data: RegisterRequest) => api.post<RegisterResponse>('/auth/register', data),

  login: (credentials: LoginRequest) => api.post<LoginResponse>('/auth/login', credentials),

  getProfile: () => api.get<User>('/auth/profile'),

  updateProfile: (data: Partial<User>) => api.put<User>('/auth/profile', data),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

// Routines endpoints
export const routinesApi = {
  getAll: () => api.get<Routine[]>('/routines'),

  getById: (id: number) => api.get<Routine>(`/routines/${id}`),

  create: (data: CreateRoutineRequest) => api.post<Routine>('/routines', data),

  update: (id: number, data: UpdateRoutineRequest) => api.put<Routine>(`/routines/${id}`, data),

  delete: (id: number) => api.delete(`/routines/${id}`),

  getStats: () => api.get('/routines/stats'),

  // Trainer endpoints
  assignRoutine: (routineId: number, athleteId: number) =>
    api.post('/routines/assign', { routineId, athleteId }),

  getAthletes: () => api.get('/routines/athletes'),

  addAthlete: (athleteEmail: string) => api.post('/routines/athletes', { athleteEmail }),

  removeAthlete: (athleteId: number) => api.delete(`/routines/athletes/${athleteId}`),

  // Athlete endpoints
  getTrainers: () => api.get('/routines/trainers'),
};

// Exercises endpoints
export const exercisesApi = {
  getAll: () => api.get<GetExercisesResponse>('/exercises'),

  getById: (id: number) => api.get<Exercise>(`/exercises/${id}`),

  create: (data: { name: string; description?: string }) => api.post<Exercise>('/exercises', data),
};

// Progress/Sessions endpoints
export const progressApi = {
  getSessions: (params?: GetSessionsParams) =>
    api.get<WorkoutSession[]>('/progress/sessions', { params }),

  getSessionById: (id: number) => api.get<WorkoutSession>(`/progress/sessions/${id}`),

  createSession: (data: CreateSessionRequest) =>
    api.post<WorkoutSession>('/progress/sessions', data),

  updateSession: (id: number, data: UpdateSessionRequest) =>
    api.put<WorkoutSession>(`/progress/sessions/${id}`, data),

  deleteSession: (id: number) => api.delete(`/progress/sessions/${id}`),

  getStats: (params?: { startDate?: string; endDate?: string }) =>
    api.get('/progress/stats', { params }),

  getExerciseProgress: (exerciseId: number, params?: GetExerciseProgressParams) =>
    api.get(`/progress/exercises/${exerciseId}`, { params }),
};

// User Metrics endpoints
export const metricsApi = {
  get: () => api.get<UserMetrics>('/metrics'),

  update: (data: UpdateMetricsRequest) => api.put<UserMetrics>('/metrics', data),

  delete: () => api.delete('/metrics'),
};

export default api;
