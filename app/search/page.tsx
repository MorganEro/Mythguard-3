import { use } from 'react';
import SearchResults from '@/components/search/SearchResults';
import { SearchCategory } from '@/types/search';
import { searchAll } from '@/actions/search/search-server-actions';
import Section from '@/components/global/sections/Section';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    types?: string;
    page?: string;
  }>;
}

export default function SearchPage({
  searchParams: searchParamsPromise,
}: SearchPageProps) {
  const searchParams = use(searchParamsPromise);
  const query = searchParams.q || '';
  const types =
    (searchParams.types?.split(',') as SearchCategory[]) || undefined;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const searchResponse = use(searchAll({ query, types, page }));

  return (
    <Section title={`Search Results for "${query}"`}>
      <SearchResults
        response={searchResponse}
        currentQuery={query}
        selectedTypes={types}
        />
    </Section>
  );
}
