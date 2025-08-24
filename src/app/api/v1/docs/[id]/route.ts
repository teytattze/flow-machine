import {
  deleteDocApi,
  getDocApi,
  updateDocApi,
} from '@/features/docs/backend/docs-apis';

export const GET = getDocApi;
export const PATCH = updateDocApi;
export const DELETE = deleteDocApi;
