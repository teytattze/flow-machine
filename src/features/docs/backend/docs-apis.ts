import { NextRequest } from 'next/server';
import { AppError } from '@/modules/app-error/app-error';
import {
  createDocUseCase,
  deleteDocUseCase,
  getDocUseCase,
  listDocsUseCase,
  updateDocUseCase,
} from '@/modules/docs/backend/docs-use-cases';
import {
  createDocRequestBodySchema,
  deleteDocRequestParamsSchema,
  getDocRequestParamsSchema,
  listDocsRequestQueriesSchema,
  updateDocRequestBodySchema,
  updateDocRequestParamsSchema,
} from '@/modules/docs/docs-types';

export const createDocApi = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createDocRequestBodySchema.parse(maybeBody);
  const output = await createDocUseCase(body);
  return Response.json(output, { status: 201 });
};

export const listDocsApi = async (request: NextRequest) => {
  const maybeQueries = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const queries = listDocsRequestQueriesSchema.parse(maybeQueries);
  const output = await listDocsUseCase(queries);
  return Response.json(output, { status: 200 });
};

export const getDocApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/docs'>,
) => {
  const maybeParams = await ctx.params;
  const params = getDocRequestParamsSchema.parse(maybeParams);

  const output = await getDocUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const updateDocApi = async (
  request: NextRequest,
  ctx: RouteContext<'/api/v1/docs'>,
) => {
  const maybeParams = await ctx.params;
  const params = updateDocRequestParamsSchema.parse(maybeParams);

  const maybeBody = await request.json();
  const body = updateDocRequestBodySchema.parse(maybeBody);

  const output = await updateDocUseCase(params.id, body);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const deleteDocApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/docs'>,
) => {
  const maybeParams = await ctx.params;
  const params = deleteDocRequestParamsSchema.parse(maybeParams);

  const output = await deleteDocUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};
