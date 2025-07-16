import { fetchSingleGuardian } from '@/actions/guardian/guardian-server-actions';
import { fetchExistingReview } from '@/actions/review/review-server-actions';
import { CreateContractButton } from '@/components/form/Button';
import LikeToggleButton from '@/components/guardians/LikeToggleButton';
import GuardianRating from '@/components/guardians/single-guardian/GuardianRating';
import Reviews from '@/components/reviews/Reviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ZoomableImage from '@/components/ui/zoomable-image';
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
  const reviewDoesNotExist =
    userId &&
    !(await fetchExistingReview({
      userId,
      categoryId: id,
      category: 'guardian',
    }));

  return (
    <section>
      <BreadCrumbs
        previousName="Guardians"
        previousLink="/guardians"
        currentName={name}
      />
      <div className="mt-6 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:h-[30rem]">
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
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold"> {name}</h1>
            <LikeToggleButton
              guardianId={id}
            />
            <div className="hidden md:block ms-auto">
              <CreateContractButton guardianId={id} />
            </div>
          </div>
          <GuardianRating
            guardianId={id}
            category="guardian"
          />
          <p className="text-muted-foreground mt-6 leading-8">{description}</p>
        </div>
        <div className="md:hidden">
          <CreateContractButton guardianId={id} />
        </div>
      </div>
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
    </section>
  );
}
export default SingleGuardianPage;
