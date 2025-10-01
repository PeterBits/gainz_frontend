// User types
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ATHLETE' | 'TRAINER';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'ATHLETE' | 'TRAINER';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Exercise types
export interface Exercise {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}

// Routine types
export interface RoutineExercise {
  id?: number;
  exerciseId: number;
  exercise?: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  rest?: number;
  order: number;
}

export interface Routine {
  id: number;
  title: string;
  description?: string;
  userId: number;
  createdBy: number;
  exercises: RoutineExercise[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoutineData {
  title: string;
  description?: string;
  exercises: Omit<RoutineExercise, 'id' | 'exercise'>[];
}

// Workout Session types
export interface SessionExercise {
  id?: number;
  exerciseId: number;
  exercise?: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  rest?: number;
  order: number;
  notes?: string;
}

export interface WorkoutSession {
  id: number;
  title: string;
  userId: number;
  routineId?: number;
  routine?: Routine;
  notes?: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  exercises: SessionExercise[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionData {
  title: string;
  routineId?: number;
  notes?: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  exercises?: Omit<SessionExercise, 'id' | 'exercise'>[];
}

// User Metrics types
export interface UserMetrics {
  id: number;
  userId: number;
  height?: number;
  weight?: number;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  bodyFat?: number;
  muscleMass?: number;
  updatedAt: string;
}

// API Error type
export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
