import { UTCDate } from '@date-fns/utc';
import { removeEntity, updateEntity } from '@/lib/backend/use-case-utils';
import { newId } from '@/lib/id';
import {
  fromMongoDoc,
  getConnectionCollection,
  toMongoDoc,
  toMongoDocId,
} from '@/lib/mongo';
import { AppError } from '@/modules/app-error/app-error';
import {
  Connection,
  CreateConnectionRequestBody,
  ListConnectionsRequestQueries,
  UpdateConnectionRequestBody,
} from '@/modules/connections/connections-types';

export const createConnectionUseCase = async (
  data: CreateConnectionRequestBody,
) => {
  const now = new UTCDate();
  const project = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    removedAt: null,
    ...data,
  } as const satisfies Connection;

  const collection = await getConnectionCollection<Connection>();
  collection.insertOne(toMongoDoc(project));

  return project;
};

export const listConnectionsUseCase = async (
  queries: ListConnectionsRequestQueries,
) => {
  const collection = await getConnectionCollection<Connection>();
  const mongoDocs = await collection
    .find({
      $or: [{ 'from.id': queries.objectId }, { 'to.id': queries.objectId }],
      removedAt: null,
    })
    .toArray();
  return mongoDocs.map(fromMongoDoc);
};

export const getConnectionUseCase = async (id: string) => {
  const collection = await getConnectionCollection<Connection>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });
  return mongoDoc === null
    ? AppError.ofCode('notFound')
    : fromMongoDoc(mongoDoc);
};

export const updateConnectionUseCase = async (
  id: string,
  data: UpdateConnectionRequestBody,
) => {
  const collection = await getConnectionCollection<Connection>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });

  if (mongoDoc === null) {
    return AppError.ofCode('notFound');
  }
  const current = fromMongoDoc(mongoDoc);

  const updated = updateEntity(current, data);
  await collection.updateOne(
    { _id: toMongoDocId(id), removedAt: null },
    { $set: updated },
  );

  return updated;
};

export const deleteConnectionUseCase = async (id: string) => {
  const collection = await getConnectionCollection<Connection>();
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
