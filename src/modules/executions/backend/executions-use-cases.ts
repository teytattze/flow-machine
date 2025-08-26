import { anthropic } from '@ai-sdk/anthropic';
import { dynamicTool, generateText } from 'ai';
import { AppError } from '@/modules/app-error/app-error';
import {
  createDocUseCase,
  getDocUseCase,
} from '@/modules/docs/backend/docs-use-cases';
import { createDocRequestBodySchema } from '@/modules/docs/docs-types';
import { getCreatePrpPrompt } from '@/modules/executions/backend/executions-prompts';
import { CreateExecutionRequestBody } from '@/modules/executions/executions-types';

export const createExecutionUseCase = async (
  data: CreateExecutionRequestBody,
) => {
  const maybeDoc = await getDocUseCase(data.target.id);

  if (AppError.is(maybeDoc)) {
    return maybeDoc;
  }

  const doc = maybeDoc;
  const { toolResults } = await generateText({
    model: anthropic('claude-sonnet-4-20250514'),
    messages: [
      { role: 'user', content: getCreatePrpPrompt(doc.project.id, doc.title) },
      {
        role: 'assistant',
        content: 'Provide me with the feature file content',
      },
      {
        role: 'user',
        content: '<feature-file>' + doc.content + '</feature-file>',
      },
    ],
    temperature: 0.5,
    tools: {
      createDoc: dynamicTool({
        description: 'Create a doc and store them in database for later use',
        inputSchema: createDocRequestBodySchema,
        execute: async (unknownInput) => {
          const body = createDocRequestBodySchema.parse(unknownInput);
          return createDocUseCase({ ...body, project: { id: doc.project.id } });
        },
      }),
    },
    toolChoice: 'required',
  });

  return toolResults[0]?.output;
};
