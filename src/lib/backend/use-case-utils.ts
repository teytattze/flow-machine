import { UTCDate } from '@date-fns/utc';
import { merge } from 'es-toolkit';

export const updateEntity = <
  T extends Record<PropertyKey, unknown> & { updatedAt: Date },
  S extends Record<PropertyKey, unknown>,
>(
  target: T,
  source: S,
) => merge(target, { ...source, updatedAt: new UTCDate() });

export const removeEntity = <
  T extends Record<PropertyKey, unknown> & { updatedAt: Date },
>(
  target: T,
) => merge(target, { removedAt: new UTCDate() });
