import type { UserMetrics } from '../entities/metrics';

// Get User Metrics
export type GetMetricsResponse = UserMetrics;

// Update User Metrics
export type UpdateMetricsRequest = Partial<Omit<UserMetrics, 'id' | 'userId' | 'updatedAt'>>;

export type UpdateMetricsResponse = UserMetrics;
