import z from 'zod';
import {
  baseEntitySchema,
  baseEntitySchemaFields,
  entityIdSchema,
} from '@/modules/shared/entity-types';

const executionActionKinds = ['CREATE_PRP'] as const;
const executionActionKindSchema = z.enum(executionActionKinds);
export type ExecutionActionKind = z.infer<typeof executionActionKindSchema>;

const executionArtifactKinds = ['DOC'] as const;
const executionArtifactKindSchema = z.enum(executionArtifactKinds);
export type ExecutionArtifactKind = z.infer<typeof executionArtifactKindSchema>;

const executionTargetKinds = ['DOC'] as const;
const executionTargetKindSchema = z.enum(executionTargetKinds);
export type ExecutionTargetKind = z.infer<typeof executionTargetKindSchema>;

export const executionAction = z.object({ kind: executionActionKindSchema });

export const executionArtifactSchema = z.object({
  id: entityIdSchema,
  kind: executionArtifactKindSchema,
});
export type ExecutionArtifact = z.infer<typeof executionArtifactSchema>;

export const executionTargetSchema = z.object({
  id: entityIdSchema,
  kind: executionTargetKindSchema,
});

export const executionSchema = baseEntitySchema.extend({
  action: executionAction,
  artifacts: executionArtifactSchema.array(),
  target: executionTargetSchema,
});
export type Execution = z.infer<typeof executionSchema>;

export const createExecutionRequestBodySchema = executionSchema.omit({
  ...baseEntitySchemaFields,
  artifacts: true,
});
export type CreateExecutionRequestBody = z.infer<
  typeof createExecutionRequestBodySchema
>;
