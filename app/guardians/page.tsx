import { Separator } from '@/components/ui/separator';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import GuardiansGrid from '@/components/guardians/GuardiansGrid';
import GuardiansList from '@/components/guardians/GuardiansList';
import LayoutToggle from '@/components/ui/LayoutToggle';

async function GuardiansPage({
  searchParams,
}: {
  searchParams: Promise<{ layout: 'grid' | 'list' }>;
}) {
  const guardians = await fetchAllGuardians();
  const totalGuardians = guardians.length;
  const layout = (await searchParams)?.layout === 'list' ? 'list' : 'grid';

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalGuardians} {totalGuardians === 1 ? 'Guardian' : 'Guardians'}
          </h4>
          <LayoutToggle currentLayout={layout} />
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
          <GuardiansGrid />
        ) : (
          <GuardiansList />
        )}
      </div>
    </>
  );
}
export default GuardiansPage;