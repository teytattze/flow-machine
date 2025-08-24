import { UTCDate } from '@date-fns/utc';
import { removeEntity, updateEntity } from '@/lib/backend/use-case-utils';
import { newId } from '@/lib/id';
import {
  fromMongoDoc,
  getTicketCollection,
  toMongoDoc,
  toMongoDocId,
} from '@/lib/mongo';
import { AppError } from '@/modules/app-error/app-error';
import {
  CreateTicketRequestBody,
  ListTicketsRequestQueries,
  Ticket,
  UpdateTicketRequestBody,
} from '@/modules/tickets/tickets-types';

export const createTicketUseCase = async (data: CreateTicketRequestBody) => {
  const now = new UTCDate();
  const project = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    removedAt: null,
    ...data,
  } as const satisfies Ticket;

  const collection = await getTicketCollection<Ticket>();
  collection.insertOne(toMongoDoc(project));

  return project;
};

export const listTicketsUseCase = async (
  queries: ListTicketsRequestQueries,
) => {
  const collection = await getTicketCollection<Ticket>();
  const mongoDocs = await collection
    .find({ project: { id: queries.projectId }, removedAt: null })
    .toArray();
  return mongoDocs.map(fromMongoDoc);
};

export const getTicketUseCase = async (id: string) => {
  const collection = await getTicketCollection<Ticket>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });
  return mongoDoc === null
    ? AppError.ofCode('notFound')
    : fromMongoDoc(mongoDoc);
};

export const updateTicketUseCase = async (
  id: string,
  data: UpdateTicketRequestBody,
) => {
  const collection = await getTicketCollection<Ticket>();
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

export const deleteTicketUseCase = async (id: string) => {
  const collection = await getTicketCollection<Ticket>();
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
