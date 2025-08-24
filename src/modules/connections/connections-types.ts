import z from 'zod';
import { baseEntitySchema, baseEntitySchemaFields, entityIdSchema } from '@/modules/shared/entity-types';

export const connectionObjectKinds = ['DOC', 'TICKET'] as const;
export const connectionObjectKindSchema = z.enum(connectionObjectKinds);
export type ConnectionObjectKind = z.infer<typeof connectionObjectKindSchema>;

const connectionObjectSchema = z.object({
  id: entityIdSchema,
  kind: connectionObjectKindSchema,
});
export type ConnectionObject = z.infer<typeof connectionObjectSchema>;

export const connectionRelationships = ['RELATED_TO'] as const;
export const connectionRelationshipSchema = z.enum(connectionRelationships);
export type ConnectionRelationship = z.infer<
  typeof connectionRelationshipSchema
>;

export const connectionSchema = baseEntitySchema.extend({
  from: connectionObjectSchema,
  to: connectionObjectSchema,
  relationship: connectionRelationshipSchema,
});
export type Connection = z.infer<typeof connectionSchema>;

export const createConnectionRequestBodySchema = connectionSchema.omit(
  baseEntitySchemaFields,
);
export type CreateConnectionRequestBody = z.infer<
  typeof createConnectionRequestBodySchema
>;

export const listConnectionsRequestQueriesSchema = z.object({
  objectId: entityIdSchema,
});
export type ListConnectionsRequestQueries = z.infer<
  typeof listConnectionsRequestQueriesSchema
>;

export const getConnectionRequestParamsSchema = z.object({
  id: entityIdSchema,
});
export type GetConnectionRequestParams = z.infer<
  typeof getConnectionRequestParamsSchema
>;

export const updateConnectionRequestParamsSchema = z.object({
  id: entityIdSchema,
});
export type UpdateConnectionRequestParams = z.infer<
  typeof updateConnectionRequestParamsSchema
>;

export const updateConnectionRequestBodySchema =
  createConnectionRequestBodySchema.partial();
export type UpdateConnectionRequestBody = z.infer<
  typeof updateConnectionRequestBodySchema
>;

export const deleteConnectionRequestParamsSchema = z.object({
  id: entityIdSchema,
});
export type DeleteConnectionREquestParams = z.infer<
  typeof deleteConnectionRequestParamsSchema
>;
