import z from 'zod';
import { baseEntitySchema, baseEntitySchemaFields, entityIdSchema } from '@/modules/shared/entity-types';

const ticketStatuses = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] as const;
export const ticketStatusSchema = z.enum(ticketStatuses);
export type TicketStatus = z.infer<typeof ticketStatusSchema>;

export const ticketSchema = baseEntitySchema.extend({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  status: ticketStatusSchema,

  docs: z.object({ id: entityIdSchema }).array(),
  project: z.object({ id: entityIdSchema }),
});
export type Ticket = z.infer<typeof ticketSchema>;

export const createTicketRequestBodySchema = ticketSchema.omit(
  baseEntitySchemaFields,
);
export type CreateTicketRequestBody = z.infer<
  typeof createTicketRequestBodySchema
>;

export const listTicketsRequestQueriesSchema = z.object({
  projectId: entityIdSchema,
});
export type ListTicketsRequestQueries = z.infer<
  typeof listTicketsRequestQueriesSchema
>;

export const getTicketRequestParamsSchema = z.object({ id: entityIdSchema });
export type GetTicketRequestParams = z.infer<
  typeof getTicketRequestParamsSchema
>;

export const updateTicketRequestParamsSchema = z.object({ id: entityIdSchema });
export type UpdateTicketRequestParamsBody = z.infer<
  typeof updateTicketRequestParamsSchema
>;

export const updateTicketRequestBodySchema =
  createTicketRequestBodySchema.partial();
export type UpdateTicketRequestBody = z.infer<
  typeof updateTicketRequestBodySchema
>;

export const deleteTicketRequestParamsSchema = z.object({ id: entityIdSchema });
export type DeleteTicketRequestParams = z.infer<
  typeof deleteTicketRequestParamsSchema
>;
