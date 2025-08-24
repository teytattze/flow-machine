import {
  deleteConnectionApi,
  getConnectionApi,
  updateConnectionApi,
} from '@/features/connections/backend/connections-apis';

export const GET = getConnectionApi;
export const PATCH = updateConnectionApi;
export const DELETE = deleteConnectionApi;
