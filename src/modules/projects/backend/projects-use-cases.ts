import { UTCDate } from '@date-fns/utc';
import { newId } from '@/libs/backend/id';
import {
  fromMongoDoc,
  getProjectCollection,
  toMongoDoc,
  toMongoDocId,
} from '@/libs/backend/mongodb';
import { removeEntity, updateEntity } from '@/libs/backend/use-case-utils';
import { AppError } from '@/modules/app-error/app-error';
import {
  CreateProjectRequestBody,
  Project,
  UpdateProjectRequestBody,
} from '@/modules/projects/projects-types';

export const createProjectUseCase = async (data: CreateProjectRequestBody) => {
  const now = new UTCDate();
  const project = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    removedAt: null,
    ...data,
  } as const satisfies Project;

  const collection = await getProjectCollection<Project>();
  collection.insertOne(toMongoDoc(project));

  return project;
};

export const listProjectsUseCase = async () => {
  const collection = await getProjectCollection<Project>();
  const mongoDocs = await collection.find({ removedAt: null }).toArray();
  return mongoDocs.map(fromMongoDoc);
};

export const getProjectUseCase = async (id: string) => {
  const collection = await getProjectCollection<Project>();
  const mongoDoc = await collection.findOne({
    _id: toMongoDocId(id),
    removedAt: null,
  });
  return mongoDoc === null
    ? AppError.ofCode('notFound')
    : fromMongoDoc(mongoDoc);
};

export const updateProjectUseCase = async (
  id: string,
  data: UpdateProjectRequestBody,
) => {
  const collection = await getProjectCollection<Project>();
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

export const deleteProjectUseCase = async (id: string) => {
  const collection = await getProjectCollection<Project>();
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
