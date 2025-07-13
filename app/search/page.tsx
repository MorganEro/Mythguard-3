import { use } from 'react';
import SearchResults from '@/components/search/SearchResults';
import { SearchCategory } from '@/types/search';
import { searchAll } from '@/actions/search/search-server-actions';
import SubSectionTitle from '@/components/global/SubSectionTitle';

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
    <>
    <SubSectionTitle text={`Search Results for "${query}"`} />
    <section className="container mx-auto py-8">
      <SearchResults
        response={searchResponse}
        currentQuery={query}
        selectedTypes={types}
        />
    </section>
    </>
  );
}
