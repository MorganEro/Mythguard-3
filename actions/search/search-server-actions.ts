import db from '@/lib/db';
import { SearchParams, SearchResult, SearchCategory } from '@/types/search';

async function searchProducts(query: string): Promise<SearchResult[]> {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { company: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      company: true,
    },
  });

  return products.map(product => ({
    id: product.id,
    type: 'products' as SearchCategory,
    name: product.name,
    description: product.description || '',
    image: product.image,
    url: `/products/${product.id}`,
    metadata: { company: product.company },
  }));
}

async function searchPrograms(query: string): Promise<SearchResult[]> {
  const programs = await db.program.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });

  return programs.map(program => ({
    id: program.id,
    type: 'programs' as SearchCategory,
    name: program.name,
    description: program.description || '',
    image: program.image,
    url: `/programs/${program.id}`,
  }));
}

async function searchGuardians(query: string): Promise<SearchResult[]> {
  const guardians = await db.guardian.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });

  return guardians.map(guardian => ({
    id: guardian.id,
    type: 'guardians' as SearchCategory,
    name: guardian.name,
    description: guardian.description || '',
    image: guardian.image,
    url: `/guardians/${guardian.id}`,
  }));
}

async function searchLocations(query: string): Promise<SearchResult[]> {
  const locations = await db.location.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      image: true,
    },
  });

  return locations.map(location => ({
    id: location.id,
    type: 'locations' as SearchCategory,
    name: location.name,
    description: location.description || '',
    address: location.address || '',
    image: location.image,
    url: `/locations/${location.id}`,
  }));
}

async function searchEvents(query: string): Promise<SearchResult[]> {
  const events = await db.event.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { locationArea: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });

  return events.map(event => ({
    id: event.id,
    type: 'events' as SearchCategory,
    name: event.name,
    description: event.description || '',
    image: event.image,
    url: `/events/${event.id}`,
  }));
}

export async function searchAll({
  query,
  types = [
    'products',
    'programs',
    'guardians',
    'events',
    'locations',
  ] as SearchCategory[],
  page = 1,
  limit = 10,
}: SearchParams) {
  const searchFunctions: Record<
    SearchCategory,
    (q: string) => Promise<SearchResult[]>
  > = {
    products: searchProducts,
    programs: searchPrograms,
    guardians: searchGuardians,
    events: searchEvents,
    locations: searchLocations,
  };

  // Execute searches in parallel for selected types
  const searchPromises = types.map(type => searchFunctions[type](query));
  const results = await Promise.all(searchPromises);

  // Combine and sort results
  const allResults = results
    .flat()
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = allResults.slice(startIndex, endIndex);

  return {
    results: paginatedResults,
    total: allResults.length,
    page,
    limit,
    hasMore: endIndex < allResults.length,
  };
}
