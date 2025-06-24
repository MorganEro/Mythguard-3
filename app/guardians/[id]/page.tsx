import GuardianBreadCrumbs from '@/components/guardians/single-guardian/GuardianBreadCrumbs';
import GuardianRating from '@/components/guardians/single-guardian/GuardianRating';
import { fetchSingleGuardian } from '@/actions/guardian/guardian-client-actions';
import LikeToggleButton from '@/components/guardians/LikeToggleButton';
import CreateContract from '@/components/guardians/single-guardian/CreateContract';
import ZoomableImage from '@/components/ui/zoomable-image';

async function SingleGuardianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guardian = await fetchSingleGuardian(id);
  const { name, image, description } = guardian;

  return (
    <section>
      <GuardianBreadCrumbs name={name} />
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
              guardianName={name}
            />
          </div>
          <GuardianRating guardianId={id} />
          <p className="text-muted-foreground mt-6 leading-8">{description}</p>
          <CreateContract id={id} />
        </div>
      </div>
    </section>
  );
}
export default SingleGuardianPage;
