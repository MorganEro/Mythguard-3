import db from '@/lib/db';
import { SearchParams, SearchResult, SearchableEntity } from '@/types/search';

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

  return products.map((product) => ({
    id: product.id,
    type: 'products' as SearchableEntity,
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

  return programs.map((program) => ({
    id: program.id,
    type: 'programs' as SearchableEntity,
    name: program.name,
    description: program.description || '',
    image: program.image,
    url: `/programs/${program.id}`,
  }));
}

// Add more search functions for other entities as needed...

export async function searchAll({ 
  query, 
  types = ['products', 'programs'], 
  page = 1, 
  limit = 10 
}: SearchParams) {
  const searchFunctions: Record<SearchableEntity, (q: string) => Promise<SearchResult[]>> = {
    products: searchProducts,
    programs: searchPrograms,
    guardians: async () => [], // Implement when needed
    events: async () => [],    // Implement when needed
    locations: async () => [], // Implement when needed
  };

  // Execute searches in parallel for selected types
  const searchPromises = types.map(type => searchFunctions[type](query));
  const results = await Promise.all(searchPromises);
  
  // Combine and sort results
  const allResults = results.flat().sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

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
