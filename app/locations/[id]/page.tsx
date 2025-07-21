import { fetchSingleLocation } from '@/actions/location/location-server-actions';
import ZoomableImage from '@/components/ui/zoomable-image';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Link from 'next/link';
import Section from '@/components/global/sections/Section';

async function SingleLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await fetchSingleLocation(id);
  const { name, image, subtitle, description, address } = location;

  return (
    <Section title={name}>
      <BreadCrumbs
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
        <div className="flex flex-col gap-y-2">
          <p className="italic">{subtitle}</p>
          <p className="text-muted-foreground">{address}</p>
          <div>
            <Link href={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${location.lat},${location.lng}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Get Directions
            </Link>
          </div>
          <p className="mt-4">{description}</p>
        </div>
      </div>
    </Section>
  );
}
export default SingleLocationPage;
