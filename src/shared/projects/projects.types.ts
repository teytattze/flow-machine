import { domainToRequestBodySchemaOmit } from "@/shared/constants";
import z from "zod";

const projectSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string(),
});
type Project = z.infer<typeof projectSchema>;

const createProjectRequestBodySchema = projectSchema.omit(
  domainToRequestBodySchemaOmit,
);
type CreateProjectRequestBody = z.infer<typeof createProjectRequestBodySchema>;

export { projectSchema, createProjectRequestBodySchema };
export type { Project, CreateProjectRequestBody };
