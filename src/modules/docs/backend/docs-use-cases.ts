import { UTCDate } from '@date-fns/utc';
import { removeEntity, updateEntity } from '@/lib/backend/use-case-utils';
import { newId } from '@/lib/id';
import {
  fromMongoDoc,
  getDocCollection,
  toMongoDoc,
  toMongoDocId,
} from '@/lib/mongo';
import { AppError } from '@/modules/app-error/app-error';
import {
  CreateDocRequestBody,
  Doc,
  ListDocsRequestQueries,
  UpdateDocRequestBody,
} from '@/modules/docs/docs-types';

export const createDocUseCase = async (data: CreateDocRequestBody) => {
  const now = new UTCDate();
  const entity = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    removedAt: null,
    ...data,
  } as const satisfies Doc;

  const collection = await getDocCollection<Doc>();
  collection.insertOne(toMongoDoc(entity));

  return entity;
};

export const listDocsUseCase = async (queries: ListDocsRequestQueries) => {
  const collection = await getDocCollection<Doc>();
  const mongoDocs = await collection
    .find({ project: { id: queries.projectId }, removedAt: null })
    .toArray();
  return mongoDocs.map(fromMongoDoc);
};

export const getDocUseCase = async (id: string) => {
  const collection = await getDocCollection<Doc>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });

  return mongoDoc === null
    ? AppError.ofCode('notFound')
    : fromMongoDoc(mongoDoc);
};

export const updateDocUseCase = async (
  id: string,
  partialData: UpdateDocRequestBody,
) => {
  const collection = await getDocCollection<Doc>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });

  if (mongoDoc === null) {
    return AppError.ofCode('notFound');
  }
  const current = fromMongoDoc(mongoDoc);

  const updated = updateEntity(current, partialData);
  await collection.updateOne(
    { _id: toMongoDocId(id), removedAt: null },
    { $set: updated },
  );

  return updated;
};

export const deleteDocUseCase = async (id: string) => {
  const collection = await getDocCollection<Doc>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });

  if (mongoDoc === null) {
    return AppError.ofCode('notFound');
  }
  const current = fromMongoDoc(mongoDoc);

  const updated = removeEntity(current);
  await collection.updateOne(
    { _id: toMongoDocId(id), removedAt: null },
    { $set: updated },
  );

  return { id };
};
