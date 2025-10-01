import type { Exercise } from './exercise';
import type { Routine } from './routine';

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
