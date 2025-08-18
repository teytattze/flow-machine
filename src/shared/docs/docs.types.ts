import { domainToRequestBodySchemaOmit } from "@/shared/constants";
import z from "zod";

const docKinds = ["PRODUCT", "TECHNICAL", "PROMPT"] as const;
const docKindSchema = z.enum(docKinds);
type DocKind = z.infer<typeof docKindSchema>;

const docSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  title: z.string(),
  content: z.string(),
  kind: docKindSchema,

  project: z.object({ id: z.string() }),
});
type Doc = z.infer<typeof docSchema>;

const createDocRequestBodySchema = docSchema.omit(
  domainToRequestBodySchemaOmit,
);
type CreateDocRequestBody = z.infer<typeof createDocRequestBodySchema>;

const getDocRequestQuerySchema = z.object({
  projectId: z.string(),
});
type GetDocRequestQuery = z.infer<typeof getDocRequestQuerySchema>;

export {
  docKinds,
  docKindSchema,
  docSchema,
  createDocRequestBodySchema,
  getDocRequestQuerySchema,
};
export type { DocKind, Doc, CreateDocRequestBody, GetDocRequestQuery };
