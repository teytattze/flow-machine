import { newId } from "@/lib/id";
import { fromMongoDoc, getTaskCollection, toMongoDoc } from "@/lib/mongo";
import {
  createTaskRequestBodySchema,
  getTaskRequestQuerySchema,
  Task,
} from "@/shared/tasks/tasks.types";
import { UTCDate } from "@date-fns/utc";
import type { NextRequest } from "next/server";

const POST = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createTaskRequestBodySchema.parse(maybeBody);

  const now = new UTCDate();
  const task = {
    id: newId(),
    createdAt: now,
    updatedAt: now,

    ...body,
  } as const satisfies Task;

  const collection = await getTaskCollection<Task>();
  collection.insertOne(toMongoDoc(task));

  return Response.json(task, { status: 201 });
};

const GET = async (request: NextRequest) => {
  const maybeQuery = Object.fromEntries(request.nextUrl.searchParams.entries());
  const query = getTaskRequestQuerySchema.parse(maybeQuery);

  const collection = await getTaskCollection<Task>();
  const mongoDocs = await collection
    .find({ project: { id: query.projectId } })
    .toArray();
  const tasks = mongoDocs.map(fromMongoDoc);

  return Response.json(tasks, { status: 200 });
};

export { POST, GET };
