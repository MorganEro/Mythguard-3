'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

export default function LayoutToggle({
  currentLayout,
}: {
  currentLayout: 'grid' | 'list';
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateLayout = (layout: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams);
    params.set('layout', layout);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="gap-x-4 hidden md:flex">
      <Button
        className="cursor-pointer"
        variant={currentLayout === 'grid' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => updateLayout('grid')}
        disabled={isPending}>
        <LuLayoutGrid />
      </Button>
      <Button
        className="cursor-pointer"
        variant={currentLayout === 'list' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => updateLayout('list')}
        disabled={isPending}>
        <LuList />
      </Button>
    </div>
  );
}
