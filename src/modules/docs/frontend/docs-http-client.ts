import ky from 'ky';

export const docsHttpClient = ky.create({ prefixUrl: '/api/v1/docs' });
