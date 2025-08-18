import { newId } from "@/lib/id";
import { fromMongoDoc, getDocCollection, toMongoDoc } from "@/lib/mongo";
import {
  createDocRequestBodySchema,
  Doc,
  getDocRequestQuerySchema,
} from "@/shared/docs/docs.types";
import { UTCDate } from "@date-fns/utc";
import type { NextRequest } from "next/server";

const POST = async (request: NextRequest) => {
  const maybeBody = await request.json();
  const body = createDocRequestBodySchema.parse(maybeBody);

  const now = new UTCDate();
  const doc = {
    id: newId(),
    createdAt: now,
    updatedAt: now,

    ...body,
  } as const satisfies Doc;

  const collection = await getDocCollection();
  collection.insertOne(toMongoDoc(doc));

  return Response.json(doc, { status: 201 });
};

const GET = async (request: NextRequest) => {
  const maybeQuery = Object.fromEntries(request.nextUrl.searchParams.entries());
  const query = getDocRequestQuerySchema.parse(maybeQuery);

  const collection = await getDocCollection<Doc>();
  const mongoDocs = await collection
    .find({ project: { id: query.projectId } })
    .toArray();
  const docs = mongoDocs.map(fromMongoDoc);

  return Response.json(docs, { status: 200 });
};

export { POST, GET };
