import { fetchSingleProgramWithDetails } from '@/actions/program/program-server-actions';
import EmptyList from '@/components/global/EmptyList';
import SubSectionTitle from '@/components/global/SubSectionTitle';
import GuardianThumbnailCard from '@/components/guardians/GuardianThumbnailCard';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Image from 'next/image';
import { CreateContractButton } from '@/components/form/Button';
import { Separator } from '@/components/ui/separator';
import Reviews from '@/components/reviews/Reviews';
import { fetchExistingReview } from '@/actions/review/review-server-actions';
import { auth } from '@clerk/nextjs/server';
import SubmitReview from '@/components/reviews/SubmitReview';

async function SingleProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchSingleProgramWithDetails(id);
  const { name, image, description } = program;

  const totalGuardians = program.guardians.length;

  const { userId } = await auth();

  const reviewDoesNotExist =
    userId &&
    !(await fetchExistingReview({
      userId,
      categoryId: id,
      category: 'program',
    }));

  return (
    <section>
      <BreadCrumbs
        previousName="Programs"
        previousLink="/programs"
        currentName={name}
      />
      <article className="mt-6 flex flex-col gap-y-8 relative">
        <div className="flex gap-x-4 items-center">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
          />
          <h1 className="capitalize text-3xl font-bold"> {name}</h1>
          <div className="hidden md:block md:ms-auto">
            <CreateContractButton programId={id} />
          </div>
        </div>
        
        <p className="text-muted-foreground mt-6 leading-8">{description}</p>
        <div className="md:hidden">
            <CreateContractButton programId={id} />
        </div>
      </article>

      <article className="mt-10">
        <SubSectionTitle text={`${totalGuardians} Related ${totalGuardians === 1 ? 'Guardian' : 'Guardians'}`} />
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
      </article>
      <Separator className="mb-6" />
      <article>
        <Reviews
          categoryId={id}
          category="program"
        />
        {reviewDoesNotExist && (
          <SubmitReview
            categoryId={id}
            category="program"
          />
        )}
      </article>
    </section>
  );
}
export default SingleProgramPage;
