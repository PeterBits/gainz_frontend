import type { Exercise } from '../entities/exercise';

// Get All Exercises
export type GetExercisesResponse = Exercise[];

// Get Exercise by ID
export type GetExerciseResponse = Exercise;

// Create Exercise
export interface CreateExerciseRequest {
  name: string;
  description?: string;
}

export type CreateExerciseResponse = Exercise;
