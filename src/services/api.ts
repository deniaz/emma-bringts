import { request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';

export const fetcher = (query: string, variables?: Variables) => request('/api/graphql', query, variables);
