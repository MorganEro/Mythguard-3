import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import GuardiansGrid from '@/components/guardians/GuardiansGrid';
import GuardiansList from '@/components/guardians/GuardiansList';

async function GuardiansPage({
  searchParams,
}: {
  searchParams: { layout: 'grid' | 'list' };
}) {
  const guardians = await fetchAllGuardians();
  const totalGuardians = guardians.length;
  const layout = searchParams?.layout === 'list' ? 'list' : 'grid';

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
              <Link href={`/guardians?layout=grid`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/guardians?layout=list`}>
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
export default GuardiansPage;
