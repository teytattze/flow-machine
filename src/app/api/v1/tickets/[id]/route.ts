import {
  deleteTicketApi,
  getTicketApi,
  updateTicketApi,
} from '@/features/tickets/backend/tickets-apis';

export const GET = getTicketApi;
export const PATCH = updateTicketApi;
export const DELETE = deleteTicketApi;
