import { NextRequest } from 'next/server';
import { AppError } from '@/modules/app-error/app-error';
import {
  createConnectionUseCase,
  deleteConnectionUseCase,
  getConnectionUseCase,
  listConnectionsUseCase,
  updateConnectionUseCase,
} from '@/modules/connections/backend/connections-use-cases';
import {
  createConnectionRequestBodySchema,
  deleteConnectionRequestParamsSchema,
  getConnectionRequestParamsSchema,
  listConnectionsRequestQueriesSchema,
  updateConnectionRequestBodySchema,
  updateConnectionRequestParamsSchema,
} from '@/modules/connections/connections-types';

export const createConnectionApi = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createConnectionRequestBodySchema.parse(maybeBody);
  const output = await createConnectionUseCase(body);
  return Response.json(output, { status: 201 });
};

export const listConnectionsApi = async (request: NextRequest) => {
  const maybeQueries = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const queries = listConnectionsRequestQueriesSchema.parse(maybeQueries);
  const output = await listConnectionsUseCase(queries);
  return Response.json(output, { status: 200 });
};

export const getConnectionApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/connections'>,
) => {
  const maybeParams = await ctx.params;
  const params = getConnectionRequestParamsSchema.parse(maybeParams);

  const output = await getConnectionUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const updateConnectionApi = async (
  request: NextRequest,
  ctx: RouteContext<'/api/v1/connections'>,
) => {
  const maybeParams = await ctx.params;
  const params = updateConnectionRequestParamsSchema.parse(maybeParams);

  const maybeBody = await request.json();
  const body = updateConnectionRequestBodySchema.parse(maybeBody);

  const output = await updateConnectionUseCase(params.id, body);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const deleteConnectionApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/connections'>,
) => {
  const maybeParams = await ctx.params;
  const params = deleteConnectionRequestParamsSchema.parse(maybeParams);

  const output = await deleteConnectionUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};
