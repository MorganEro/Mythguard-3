import { fetchNumberOfContracts } from '@/actions/contract/contract-server-actions';
import { fetchSingleGuardian } from '@/actions/guardian/guardian-server-actions';
import { fetchExistingReview } from '@/actions/review/review-server-actions';
import { CreateContractButton } from '@/components/form/Button';
import Section from '@/components/global/sections/Section';
import LikeToggleButton from '@/components/guardians/LikeToggleButton';
import GuardianRating from '@/components/guardians/single-guardian/GuardianRating';
import Reviews from '@/components/reviews/Reviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ZoomableImage from '@/components/ui/zoomable-image';
import { MAX_CONTRACTS_PER_USER } from '@/lib/utils/constants';
import { auth } from '@clerk/nextjs/server';

async function SingleGuardianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guardian = await fetchSingleGuardian(id);
  const { name, image, description } = guardian;
  const { userId } = await auth();
  const numContracts = await fetchNumberOfContracts() as number;

  const reviewDoesNotExist =
    userId &&
    !(await fetchExistingReview({
      userId,
      categoryId: id,
      category: 'guardian',
    }));

  return (
    <Section title={name}>
      <BreadCrumbs
        previousName="Guardians"
        previousLink="/guardians"
        currentName={name}
      />
      <article className="my-4 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:h-[30rem]">
        {/* IMAGE FIRST COL */}
        <ZoomableImage
          src={image}
          alt={name}
          width={800}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[4/5] w-full md:max-h-[30rem]"
          imageClassName="w-full h-full"
        />

        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center justify-between">
            <GuardianRating
              guardianId={id}
              category="guardian"
            />
            <LikeToggleButton
              guardianId={id}
            />
            {numContracts < MAX_CONTRACTS_PER_USER && (
              <div className="hidden md:block ms-auto">
                <CreateContractButton guardianId={id} />
              </div>
            )}
          </div>
          <p className="text-muted-foreground mt-6 leading-8">{description}</p>
        </div>
        <div className="md:hidden">
          {numContracts < MAX_CONTRACTS_PER_USER && (
            <CreateContractButton guardianId={id} />
          )}
        </div>
      </article>
      <Reviews
        categoryId={id}
        category="guardian"
      />
      {reviewDoesNotExist && (
        <SubmitReview
            categoryId={id}
            category="guardian"
          />
        )}
    </Section>
  );
}
export default SingleGuardianPage;
