import type { Exercise } from './exercise';

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
