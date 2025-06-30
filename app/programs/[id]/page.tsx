import { fetchSingleProgram } from '@/actions/program/program-client-actions';
import CreateContract from '@/components/guardians/single-guardian/CreateContract';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Image from 'next/image';

async function SingleGuardianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchSingleProgram(id);
  const { name, image, description } = program;

  return (
    <section>
      <BreadCrumbs
        homeName="Home"
        homeLink="/"
        previousName="Programs"
        previousLink="/programs"
        currentName={name}
      />
      <div className="mt-6 flex flex-col gap-y-8">
        <div className="flex gap-x-4 items-center sm:items-baseline">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
          />
          <h1 className="capitalize text-3xl font-bold"> {name}</h1>
        </div>

        <p className="text-muted-foreground mt-6 leading-8">{description}</p>
        <div className="flex justify-start">
          <CreateContract id={id} />
        </div>
      </div>

      <div className="mt-6 text-red-600">
        This is where the related guardian thumbnails will be displayed
      </div>
    </section>
  );
}
export default SingleGuardianPage;
