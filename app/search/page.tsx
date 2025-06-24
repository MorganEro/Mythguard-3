import { use } from 'react';
import SearchResults from '@/components/search/SearchResults';
import { SearchableEntity } from '@/types/search';
import { searchAll } from '@/actions/search/search-server-actions';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    types?: string;
    page?: string;
  }>;
}

export default function SearchPage({ searchParams: searchParamsPromise }: SearchPageProps) {
  const searchParams = use(searchParamsPromise);
  const query = searchParams.q || '';
  const types = searchParams.types?.split(',') as SearchableEntity[] || undefined;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const searchResponse = use(searchAll({ query, types, page }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      <SearchResults 
        response={searchResponse}
        currentQuery={query}
        selectedTypes={types}
      />
    </div>
  );
}
