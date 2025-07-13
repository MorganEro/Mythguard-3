'use client';

import { SearchResponse, SearchCategory } from '@/types/search';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import CategoryFilter from '../ui/categoryFilter';

type SearchResultsProps = {
  response: SearchResponse;
  currentQuery: string;
  selectedTypes?: SearchCategory[];
}

const typeLabels: Record<SearchCategory, string> = {
  products: 'Products',
  programs: 'Programs',
  guardians: 'Guardians',
  events: 'Events',
  locations: 'Locations',
};

const typeColors: Record<SearchCategory, string> = {
  products: 'bg-blue-800',
  programs: 'bg-orange-800',
  guardians: 'bg-orange-500',
  events: 'bg-yellow-500',
  locations: 'bg-green-500',
};

export default function SearchResults({
  response,
  currentQuery,
  selectedTypes,
}: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateTypes = (type: SearchCategory, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    const currentTypes = params.get('types')?.split(',') || [];

    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);

    if (newTypes.length > 0) {
      params.set('types', newTypes.join(','));
    } else {
      params.delete('types');
    }

    router.push(`/search?${params.toString()}`);
  };

  const loadMore = () => {
    const params = new URLSearchParams(searchParams);
    const nextPage = (response.page + 1).toString();
    params.set('page', nextPage);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={typeLabels}
        selected={ selectedTypes || []}
        onchange={updateTypes}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {response.results.map(result => (
          <Card key={`${result.type}-${result.id}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{result.name}</CardTitle>
                <Badge className={typeColors[result.type]}>
                  {typeLabels[result.type]}
                </Badge>
              </div>
              {result.description && (
                <CardDescription className="line-clamp-2">
                  {result.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <Link
                href={result.url}
                className="text-sm text-primary hover:underline">
                View details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {response.hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMore}
            variant="outline">
            Load More
          </Button>
        </div>
      )}

      {response.results.length === 0 && (
        <p className="text-center text-muted-foreground">
          No results found for &quot;{currentQuery}&quot;
        </p>
      )}
    </div>
  );
}
