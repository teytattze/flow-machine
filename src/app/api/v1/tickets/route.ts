import {
  createTicketApi,
  listTicketsApi,
} from '@/features/tickets/backend/tickets-apis';

export const POST = createTicketApi;
export const GET = listTicketsApi;
