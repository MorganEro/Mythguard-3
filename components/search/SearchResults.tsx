'use client';

import { SearchResponse, SearchableEntity } from '@/types/search';
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
import { Checkbox } from '../ui/checkbox';

interface SearchResultsProps {
  response: SearchResponse;
  currentQuery: string;
  selectedTypes?: SearchableEntity[];
}

const typeLabels: Record<SearchableEntity, string> = {
  products: 'Products',
  programs: 'Programs',
  guardians: 'Guardians',
  events: 'Events',
  locations: 'Locations',
};

const typeColors: Record<SearchableEntity, string> = {
  products: 'bg-blue-500',
  programs: 'bg-green-500',
  guardians: 'bg-purple-500',
  events: 'bg-yellow-500',
  locations: 'bg-red-500',
};

export default function SearchResults({
  response,
  currentQuery,
  selectedTypes,
}: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateTypes = (type: SearchableEntity, checked: boolean) => {
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
      <div className="flex gap-4 flex-wrap">
        {Object.entries(typeLabels).map(([type, label]) => (
          <div
            key={type}
            className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={selectedTypes?.includes(type as SearchableEntity)}
              onCheckedChange={checked =>
                updateTypes(type as SearchableEntity, checked as boolean)
              }
            />
            <label
              htmlFor={type}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          </div>
        ))}
      </div>

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
                className="text-sm text-blue-500 hover:underline">
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
