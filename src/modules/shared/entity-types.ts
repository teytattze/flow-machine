import z from 'zod';

export const entityIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const baseEntitySchema = z.object({
  id: entityIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  removedAt: z.date().nullable(),
});

export const baseEntitySchemaFields ={
  id: true,
  createdAt: true,
  updatedAt: true,
  removedAt: true,
} as const;
