'use client';

import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

function NavSearch() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchValue?.toString() || '');

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/products?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchValue) {
      setSearchTerm('');
    }
  }, [searchValue, searchParams]);

  return (
    <div className="relative max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <FiSearch />
      </span>
      <Input
        type="search"
        placeholder="What do you seek?"
        className="pl-10 dark:bg-muted"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
export default NavSearch;
