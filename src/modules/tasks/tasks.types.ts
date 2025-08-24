import { baseEntitySchema, baseEntitySchemaFields } from "@/modules/shared/entity-types";
import z from "zod";

const taskStatuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;
const taskStatusSchema = z.enum(taskStatuses);
type TaskStatus = z.infer<typeof taskStatusSchema>;

const taskSchema = baseEntitySchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  status: taskStatusSchema,

  docs: z.object({ id: z.string() }).array(),
  project: z.object({ id: z.string() }),
});
type Task = z.infer<typeof taskSchema>;

const createTaskRequestBodySchema = taskSchema.omit(
  baseEntitySchemaFields,
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
