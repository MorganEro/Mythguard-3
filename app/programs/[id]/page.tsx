import { fetchSingleProgramWithDetails } from '@/actions/program/program-server-actions';
import EmptyList from '@/components/global/EmptyList';
import SubSectionTitle from '@/components/global/SubSectionTitle';
import GuardianThumbnailCard from '@/components/guardians/GuardianThumbnailCard';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Image from 'next/image';
import { CreateContractButton } from '@/components/form/Button';

async function SingleGuardianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchSingleProgramWithDetails(id);
  const { name, image, description } = program;

  const totalGuardians = program.guardians.length;

  return (
    <section>
      <BreadCrumbs
        homeName="Home"
        homeLink="/"
        previousName="Programs"
        previousLink="/programs"
        currentName={name}
      />
      <div className="mt-6 flex flex-col gap-y-8 relative">
        <div className="flex gap-x-4 items-center">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
          />
          <h1 className="capitalize text-3xl font-bold"> {name}</h1>
        </div>

        <p className="text-muted-foreground mt-6 leading-8">{description}</p>
       
      </div>

      <article className="mt-10">
        <SubSectionTitle text="Related Guardians" />
        <div className="mt-6 flex gap-4 overflow-x-scroll scrollbar-none h-65">
          {totalGuardians === 0 ? (
            <EmptyList heading="No Guardians Found" />
          ) : (
            program.guardians.map(guardian => (
              <GuardianThumbnailCard
                key={guardian.id}
                id={guardian.id}
                name={guardian.name}
                image={guardian.image}
              />
            ))
          )}
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-muted-foreground">
            {totalGuardians} related{' '}
            {totalGuardians === 1 ? 'Guardian' : 'Guardians'}
          </h4>
        </div>
      </article>
      <CreateContractButton programId={id} />
    </section>
  );
}
export default SingleGuardianPage;
