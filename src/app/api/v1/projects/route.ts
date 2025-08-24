import {
  createProjectApi,
  listProjectsApi,
} from '@/features/projects/backend/projects-apis';

export const POST = createProjectApi;
export const GET = listProjectsApi;
