export type SearchableEntity = 'products' | 'programs' | 'guardians' | 'events' | 'locations';

export interface SearchResult {
  id: string;
  type: SearchableEntity;
  name: string;
  description?: string;
  image?: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface SearchParams {
  query: string;
  types?: SearchableEntity[];
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
