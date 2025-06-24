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
    if (!value.trim()) return;
    
    const params = new URLSearchParams();
    params.set('q', value);
    replace(`/search?${params.toString()}`);
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
        placeholder="Search..."
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
