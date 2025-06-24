import GuardiansGrid from './GuardiansGrid';
import GuardiansList from './GuardiansList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllGuardians } from '@/actions/guardian/guardian-client-actions';

async function GuardiansContainer({
  layout,
  search,
}: {
  layout: 'grid' | 'list';
  search: string | string[];
}) {
  const guardians = await fetchAllGuardians({ search: search as string });
  const totalGuardians = guardians.length;
  const searchTerm = search ? `&search=${search}` : '';

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalGuardians} {totalGuardians === 1 ? 'Guardian' : 'Guardians'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              asChild
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/guardians?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/guardians?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* GUARDIANS */}
      <div>
        {totalGuardians === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no guardians matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <GuardiansGrid guardians={guardians} />
        ) : (
          <GuardiansList guardians={guardians} />
        )}
      </div>
    </>
  );
}
export default GuardiansContainer;
