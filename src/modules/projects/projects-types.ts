import z from 'zod';
import { baseEntitySchema, baseEntitySchemaFields } from '@/modules/shared/entity-types';

const projectSchema = baseEntitySchema.extend({
  displayName: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
});
export type Project = z.infer<typeof projectSchema>;

export const createProjectRequestBodySchema = projectSchema.omit(
  baseEntitySchemaFields,
);
export type CreateProjectRequestBody = z.infer<
  typeof createProjectRequestBodySchema
>;

export const getProjectRequestParamsSchema = z.object({
  id: z.string(),
});
export type GetProjectRequestParams = z.infer<
  typeof getProjectRequestParamsSchema
>;

export const updateProjectRequestParamsSchema = z.object({
  id: z.string(),
});
export type UpdateProjectRequestParams = z.infer<
  typeof updateProjectRequestParamsSchema
>;

export const updateProjectRequestBodySchema =
  createProjectRequestBodySchema.partial();
export type UpdateProjectRequestBody = z.infer<
  typeof updateProjectRequestBodySchema
>;

export const deleteProjectRequestParamsSchema = z.object({
  id: z.string(),
});
export type DeleteProjectRequestParams = z.infer<
  typeof deleteProjectRequestParamsSchema
>;
