import axios from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  Routine,
  CreateRoutineData,
  Exercise,
  WorkoutSession,
  CreateSessionData,
  UserMetrics,
} from '@/types';

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
    if (error.response?.status === 401) {
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
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  getProfile: () =>
    api.get<User>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    api.put<User>('/auth/profile', data),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

// Routines endpoints
export const routinesApi = {
  getAll: () =>
    api.get<Routine[]>('/routines'),

  getById: (id: number) =>
    api.get<Routine>(`/routines/${id}`),

  create: (data: CreateRoutineData) =>
    api.post<Routine>('/routines', data),

  update: (id: number, data: Partial<CreateRoutineData>) =>
    api.put<Routine>(`/routines/${id}`, data),

  delete: (id: number) =>
    api.delete(`/routines/${id}`),

  getStats: () =>
    api.get('/routines/stats'),

  // Trainer endpoints
  assignRoutine: (routineId: number, athleteId: number) =>
    api.post('/routines/assign', { routineId, athleteId }),

  getAthletes: () =>
    api.get('/routines/athletes'),

  addAthlete: (athleteEmail: string) =>
    api.post('/routines/athletes', { athleteEmail }),

  removeAthlete: (athleteId: number) =>
    api.delete(`/routines/athletes/${athleteId}`),

  // Athlete endpoints
  getTrainers: () =>
    api.get('/routines/trainers'),
};

// Exercises endpoints
export const exercisesApi = {
  getAll: () =>
    api.get<Exercise[]>('/exercises'),

  getById: (id: number) =>
    api.get<Exercise>(`/exercises/${id}`),

  create: (data: { name: string; description?: string }) =>
    api.post<Exercise>('/exercises', data),
};

// Progress/Sessions endpoints
export const progressApi = {
  getSessions: (params?: {
    routineId?: number;
    startDate?: string;
    endDate?: string;
    completed?: boolean;
    limit?: number;
    offset?: number;
  }) =>
    api.get<WorkoutSession[]>('/progress/sessions', { params }),

  getSessionById: (id: number) =>
    api.get<WorkoutSession>(`/progress/sessions/${id}`),

  createSession: (data: CreateSessionData) =>
    api.post<WorkoutSession>('/progress/sessions', data),

  updateSession: (id: number, data: Partial<CreateSessionData>) =>
    api.put<WorkoutSession>(`/progress/sessions/${id}`, data),

  deleteSession: (id: number) =>
    api.delete(`/progress/sessions/${id}`),

  getStats: (params?: { startDate?: string; endDate?: string }) =>
    api.get('/progress/stats', { params }),

  getExerciseProgress: (
    exerciseId: number,
    params?: { startDate?: string; endDate?: string; limit?: number }
  ) =>
    api.get(`/progress/exercises/${exerciseId}`, { params }),
};

// User Metrics endpoints
export const metricsApi = {
  get: () =>
    api.get<UserMetrics>('/metrics'),

  update: (data: Partial<Omit<UserMetrics, 'id' | 'userId' | 'updatedAt'>>) =>
    api.put<UserMetrics>('/metrics', data),

  delete: () =>
    api.delete('/metrics'),
};

export default api;
