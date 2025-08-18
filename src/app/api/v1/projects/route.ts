import { newId } from "@/lib/id";
import { fromMongoDoc, getProjectCollection, toMongoDoc } from "@/lib/mongo";
import {
  createProjectRequestBodySchema,
  Project,
} from "@/shared/projects/projects.types";
import { UTCDate } from "@date-fns/utc";
import type { NextRequest } from "next/server";

const POST = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createProjectRequestBodySchema.parse(maybeBody);

  const now = new UTCDate();
  const project = {
    id: newId(),
    createdAt: now,
    updatedAt: now,

    ...body,
  } as const satisfies Project;

  const collection = await getProjectCollection<Project>();
  collection.insertOne(toMongoDoc(project));

  return Response.json(project, { status: 201 });
};

const GET = async () => {
  const collection = await getProjectCollection<Project>();
  const mongoDocs = await collection.find().toArray();
  const project = mongoDocs.map(fromMongoDoc);

  return Response.json(project, { status: 200 });
};

export { POST, GET };
