import type { Routine, RoutineExercise } from '../entities/routine';

// Get All Routines
export type GetRoutinesResponse = Routine[];

// Get Routine by ID
export type GetRoutineResponse = Routine;

// Create Routine
export interface CreateRoutineRequest {
  title: string;
  description?: string;
  exercises: Omit<RoutineExercise, 'id' | 'exercise'>[];
}

export type CreateRoutineResponse = Routine;

// Update Routine
export type UpdateRoutineRequest = Partial<CreateRoutineRequest>;

export type UpdateRoutineResponse = Routine;

// Assign Routine to Athlete (Trainer only)
export interface AssignRoutineRequest {
  routineId: number;
  athleteId: number;
}

// Add Athlete (Trainer only)
export interface AddAthleteRequest {
  athleteEmail: string;
}
