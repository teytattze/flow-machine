import ky from 'ky';

export const ticketsHttpClient = ky.create({ prefixUrl: '/api/v1/tickets' });
