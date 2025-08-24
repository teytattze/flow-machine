import { NextRequest } from 'next/server';
import { AppError } from '@/modules/app-error/app-error';
import {
  createProjectUseCase,
  deleteProjectUseCase,
  getProjectUseCase,
  listProjectsUseCase,
  updateProjectUseCase,
} from '@/modules/projects/backend/projects-use-cases';
import {
  createProjectRequestBodySchema,
  deleteProjectRequestParamsSchema,
  getProjectRequestParamsSchema,
  updateProjectRequestBodySchema,
  updateProjectRequestParamsSchema,
} from '@/modules/projects/projects-types';

export const createProjectApi = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createProjectRequestBodySchema.parse(maybeBody);
  const output = await createProjectUseCase(body);
  return Response.json(output, { status: 201 });
};

export const listProjectsApi = async () => {
  const output = await listProjectsUseCase();
  return Response.json(output, { status: 200 });
};

export const getProjectApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/projects'>,
) => {
  const maybeParams = await ctx.params;
  const params = getProjectRequestParamsSchema.parse(maybeParams);

  const output = await getProjectUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const updateProjectApi = async (
  request: NextRequest,
  ctx: RouteContext<'/api/v1/projects'>,
) => {
  const maybeParams = await ctx.params;
  const params = updateProjectRequestParamsSchema.parse(maybeParams);

  const maybeBody = await request.json();
  const body = updateProjectRequestBodySchema.parse(maybeBody);

  const output = await updateProjectUseCase(params.id, body);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};

export const deleteProjectApi = async (
  _: NextRequest,
  ctx: RouteContext<'/api/v1/projects'>,
) => {
  const maybeParams = await ctx.params;
  const params = deleteProjectRequestParamsSchema.parse(maybeParams);

  const output = await deleteProjectUseCase(params.id);

  return AppError.is(output)
    ? Response.json(output.toDto(), { status: output.status })
    : Response.json(output, { status: 200 });
};
