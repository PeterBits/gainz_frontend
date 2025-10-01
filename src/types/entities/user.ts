export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ATHLETE' | 'TRAINER';
  createdAt: string;
}

export type UserRole = User['role'];
