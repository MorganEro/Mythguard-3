import { fetchSingleContractWithRelatedFields } from '@/actions/contract/contract-server-actions';
import EmptyList from '@/components/global/EmptyList';
import SubSectionTitle from '@/components/global/SubSectionTitle';
import GuardianThumbnailCard from '@/components/guardians/GuardianThumbnailCard';
import ProgramThumbnailCard from '@/components/programs/ProgramThumbnailCard';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { formatDate } from '@/lib/format';

async function SingleContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contract = await fetchSingleContractWithRelatedFields(id);

  if ('message' in contract) {
    return console.error(contract.message);
  }

  const { name, description, startDate, endDate, updatedAt, createdAt } = contract;

  const createdAtDate = new Date(createdAt).getTime();
  const updatedAtDate = new Date(updatedAt).getTime();
  const isUpdated = createdAtDate !== updatedAtDate;


  return (
    <section>
      <BreadCrumbs
        previousName="Contracts"
        previousLink="/contracts"
        currentName={name}
      />
      <div className="mt-6 flex flex-col gap-y-8">
        <h1 className="capitalize text-3xl font-bold"> {name}</h1>
        <div className="flex gap-x-4 items-center">
          <p>Starts: <strong> {formatDate(startDate)}</strong></p>
          <p>Ends: <strong> {formatDate(endDate)}</strong></p>
        </div>
        <p className="text-muted-foreground mt-6 leading-8">{description}</p>
      </div>

      <article className="mt-10 grid grid-cols-2 gap-4 md:w-1/2">
        <div>
          <SubSectionTitle text="Contract Guardian" lined={false} />
          <div className="mt-2 flex gap-4 h-65">
            {contract.guardian ? (
              <GuardianThumbnailCard
                key={contract.guardian.id}
                id={contract.guardian.id}
                name={contract.guardian.name}
                image={contract.guardian.image}
              />
            ) : (
              <EmptyList heading="No Guardian Found" />
            )}
          </div>
        </div>
        <div>
          <SubSectionTitle text="Contract Program" lined={false} />
          <div className="mt-2 flex gap-4  h-65">
            {contract.program ? (
              <ProgramThumbnailCard
                key={contract.program.id}
                id={contract.program.id}
                name={contract.program.name}
                image={contract.program.image}
              />
            ) : (
              <EmptyList heading="No Program Found" />
            )}
          </div>
        </div>
      </article>
      <div className="flex justify-between mt-4 text-muted-foreground">
        <p>Created: {formatDate(createdAt)}</p>
        {!isUpdated && <p>Last Updated: {formatDate(updatedAt)}</p>}
      </div>
    </section>
  );
}
export default SingleContractPage;
