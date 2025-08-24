import {
  deleteProjectApi,
  getProjectApi,
  updateProjectApi,
} from '@/features/projects/backend/projects-apis';

export const GET = getProjectApi;
export const PATCH = updateProjectApi;
export const DELETE = deleteProjectApi;
