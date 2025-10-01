import type { SessionExercise,WorkoutSession } from '../entities/session';

// Get Sessions
export interface GetSessionsParams {
  routineId?: number;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
  limit?: number;
  offset?: number;
}

export type GetSessionsResponse = WorkoutSession[];

// Get Session by ID
export type GetSessionResponse = WorkoutSession;

// Create Session
export interface CreateSessionRequest {
  title: string;
  routineId?: number;
  notes?: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  exercises?: Omit<SessionExercise, 'id' | 'exercise'>[];
}

export type CreateSessionResponse = WorkoutSession;

// Update Session
export type UpdateSessionRequest = Partial<CreateSessionRequest>;

export type UpdateSessionResponse = WorkoutSession;

// Get Session Stats
export interface GetSessionStatsParams {
  startDate?: string;
  endDate?: string;
}

// Get Exercise Progress
export interface GetExerciseProgressParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
}
