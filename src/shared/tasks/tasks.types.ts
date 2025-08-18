import { domainToRequestBodySchemaOmit } from "@/shared/constants";
import z from "zod";

const taskStatuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;
const taskStatusSchema = z.enum(taskStatuses);
type TaskStatus = z.infer<typeof taskStatusSchema>;

const taskSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  title: z.string(),
  content: z.string(),
  status: taskStatusSchema,

  docs: z.object({ id: z.string() }).array(),
  project: z.object({ id: z.string() }),
});
type Task = z.infer<typeof taskSchema>;

const createTaskRequestBodySchema = taskSchema.omit(
  domainToRequestBodySchemaOmit,
);
type CreateTaskRequestBody = z.infer<typeof createTaskRequestBodySchema>;

const getTaskRequestQuerySchema = z.object({
  projectId: z.string(),
});
type GetTaskRequestQuery = z.infer<typeof getTaskRequestQuerySchema>;

export {
  taskStatuses,
  taskStatusSchema,
  taskSchema,
  createTaskRequestBodySchema,
  getTaskRequestQuerySchema,
};
export type { TaskStatus, Task, CreateTaskRequestBody, GetTaskRequestQuery };
