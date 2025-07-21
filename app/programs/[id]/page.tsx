import { fetchSingleProgramWithDetails } from '@/actions/program/program-server-actions';
import { fetchExistingReview } from '@/actions/review/review-server-actions';
import { CreateContractButton } from '@/components/form/Button';
import EmptyList from '@/components/global/EmptyList';
import Section from '@/components/global/sections/Section';
import SubSection from '@/components/global/sections/SubSection';
import GuardianThumbnailCard from '@/components/guardians/GuardianThumbnailCard';
import Reviews from '@/components/reviews/Reviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

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
    <Section title={name}>
      <BreadCrumbs
        previousName="Programs"
        previousLink="/programs"
        currentName={name}
      />
      <article className="my-4 flex flex-col gap-y-8 relative">
        <div className="flex gap-4 flex-col md:flex-row justify-between">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
          />
          <div className="hidden md:block">
            <CreateContractButton programId={id} />
          </div>
        </div>
        <p>{description}</p>
        <div className="md:hidden">
          <CreateContractButton programId={id} />
        </div>
      </article>

      <SubSection title={`${totalGuardians} Related ${totalGuardians === 1 ? 'Guardian' : 'Guardians'}`}>
        <div className="mt-4 flex gap-4 overflow-x-scroll scrollbar-none h-65">
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
      </SubSection>
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
    </Section>
  );
}
export default SingleProgramPage;
