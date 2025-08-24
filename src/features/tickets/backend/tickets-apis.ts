import { NextRequest } from 'next/server';
import { AppError } from '@/modules/app-error/app-error';
import {
  createTicketUseCase,
  deleteTicketUseCase,
  getTicketUseCase,
  listTicketsUseCase,
  updateTicketUseCase,
} from '@/modules/tickets/backend/tickets-use-cases';
import {
  createTicketRequestBodySchema,
  deleteTicketRequestParamsSchema,
  getTicketRequestParamsSchema,
  listTicketsRequestQueriesSchema,
  updateTicketRequestBodySchema,
  updateTicketRequestParamsSchema,
} from '@/modules/tickets/tickets-types';

export const createTicketApi = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createTicketRequestBodySchema.parse(maybeBody);
  const output = await createTicketUseCase(body);
  return Response.json(output, { status: 201 });
};

export const listTicketsApi = async (request: NextRequest) => {
  const maybeQueries = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const queries = listTicketsRequestQueriesSchema.parse(maybeQueries);
  const output = await listTicketsUseCase(queries);
  return Response.json(output, { status: 200 });
};

export const getTicketApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/tickets'>,
) => {
  const maybeParams = await ctx.params;
  const params = getTicketRequestParamsSchema.parse(maybeParams);

  const output = await getTicketUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const updateTicketApi = async (
  request: NextRequest,
  ctx: RouteContext<'/api/v1/tickets'>,
) => {
  const maybeParams = await ctx.params;
  const params = updateTicketRequestParamsSchema.parse(maybeParams);

  const maybeBody = await request.json();
  const body = updateTicketRequestBodySchema.parse(maybeBody);

  const output = await updateTicketUseCase(params.id, body);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const deleteTicketApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/tickets'>,
) => {
  const maybeParams = await ctx.params;
  const params = deleteTicketRequestParamsSchema.parse(maybeParams);

  const output = await deleteTicketUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};
