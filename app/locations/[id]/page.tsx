import { fetchSingleLocation } from '@/actions/location/location-server-actions';
import ZoomableImage from '@/components/ui/zoomable-image';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

async function SingleLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await fetchSingleLocation(id);
  const { name, image, subtitle, description, address } = location;

  return (
    <section>
      <BreadCrumbs
        homeName="Home"
        homeLink="/"
        previousName="Locations"
        previousLink="/locations"
        currentName={name}
      />
      <div className="mt-6 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:h-[30rem]">
        <ZoomableImage
          src={image}
          alt={name}
          width={800}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[4/5] w-full md:max-h-[30rem]"
          imageClassName="w-full h-full"
          objectPosition="center"
        />
        {/* LOCATION INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold text-primary"> {name}</h1>
          </div>
          <p className="italic mt-2 leading-8">{subtitle}</p>
          <p className="text-muted-foreground mt-2 leading-8">{address}</p>
          <p className="mt-6 leading-8">{description}</p>
        </div>
      </div>
    </section>
  );
}
export default SingleLocationPage;
