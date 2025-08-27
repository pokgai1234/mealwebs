// src/lib/shopping-task-store.ts
import type { OrchestratorResult } from '@/types/shopping';

// This is a simple in-memory store for prototype purposes.
// In a production application, you would use a database (e.g., Redis, PostgreSQL).
export const shoppingTaskResults = new Map<string, OrchestratorResult>();

export const setTaskResult = (requestId: string, result: OrchestratorResult) => {
  shoppingTaskResults.set(requestId, result);
};

export const getTaskResult = (requestId: string): OrchestratorResult | undefined => {
  return shoppingTaskResults.get(requestId);
};

export const deleteTaskResult = (requestId: string) => {
  shoppingTaskResults.delete(requestId);
};
