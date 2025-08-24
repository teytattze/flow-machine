import {
  createConnectionApi,
  listConnectionsApi,
} from '@/features/connections/backend/connections-apis';

export const POST = createConnectionApi;
export const GET = listConnectionsApi;
