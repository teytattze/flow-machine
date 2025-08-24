import z from 'zod';
import { baseEntitySchema, baseEntitySchemaFields, entityIdSchema } from '@/modules/shared/entity-types';

const docKinds = ['PRODUCT', 'TECHNICAL', 'PROMPT'] as const;
const docKindSchema = z.enum(docKinds);
export type DocKind = z.infer<typeof docKindSchema>;

const docSchema = baseEntitySchema.extend({
  title: z.string(),
  content: z.string(),
  kind: docKindSchema,

  project: z.object({ id: entityIdSchema }),
});
export type Doc = z.infer<typeof docSchema>;

export const createDocRequestBodySchema = docSchema.omit(
  baseEntitySchemaFields,
);
export type CreateDocRequestBody = z.infer<typeof createDocRequestBodySchema>;

export const listDocsRequestQueriesSchema = z.object({
  projectId: entityIdSchema,
});
export type ListDocsRequestQueries = z.infer<
  typeof listDocsRequestQueriesSchema
>;

export const getDocRequestParamsSchema = z.object({ id: entityIdSchema });
export type GetDocRequestParams = z.infer<typeof getDocRequestParamsSchema>;

export const updateDocRequestParamsSchema = z.object({ id: entityIdSchema });
export type UpdateDocRequestParams = z.infer<
  typeof updateDocRequestParamsSchema
>;

export const updateDocRequestBodySchema = createDocRequestBodySchema.partial();
export type UpdateDocRequestBody = z.infer<typeof updateDocRequestBodySchema>;

export const deleteDocRequestParamsSchema = z.object({ id: entityIdSchema });
export type DeleteDocRequestParams = z.infer<
  typeof deleteDocRequestParamsSchema
>;
