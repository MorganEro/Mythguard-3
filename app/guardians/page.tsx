import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import EmptyList from '@/components/global/EmptyList';
import ItemsCount from '@/components/global/ItemsCount';
import Section from '@/components/global/sections/Section';
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
  const layout = (await searchParams)?.layout === 'grid' ? 'grid' : 'list';

  return (
    <>
      <Section title='Guardians'>
        <ItemsCount count={totalGuardians} text="Guardian">
          <LayoutToggle currentLayout={layout} />
        </ItemsCount>
      </Section>
      {/* GUARDIANS */}
      <div>
        {totalGuardians === 0 ? (
        <EmptyList heading="There are currently no guardians" />
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