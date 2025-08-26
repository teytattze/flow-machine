import { NextRequest } from 'next/server';
import { createExecutionUseCase } from '@/modules/executions/backend/executions-use-cases';
import { createExecutionRequestBodySchema } from '@/modules/executions/executions-types';

export const createExecutionApi = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createExecutionRequestBodySchema.parse(maybeBody);
  const output = await createExecutionUseCase(body);
  return Response.json(output, { status: 201 });
};
