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
