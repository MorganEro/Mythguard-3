import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllLocations } from '@/actions/location/location-server-actions';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import GoogleMapWrapper from './GoogleMapWrapper';

async function LocationContainer({ search }: { search: string | string[] }) {
  const locations = await fetchAllLocations({ search: search as string });
  const totalLocations = locations.length;

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalLocations} {totalLocations === 1 ? 'Location' : 'Locations'}
          </h4>
        </div>
        <Separator className="mt-4" />
        <Card className="mt-6">
          <CardContent className="p-2">
            <GoogleMapWrapper locations={locations.map(loc => ({
              id: loc.id,
              name: loc.name,
              lat: loc.lat,
              lng: loc.lng,
              mapIcon: loc.mapIcon,
              subtitle: loc.subtitle,
              shortDescription: loc.shortDescription,
              description: loc.description,
              address: loc.address,
              image: loc.image,
              createdAt: loc.createdAt,
              updatedAt: loc.updatedAt
            }))} />
          </CardContent>
        </Card>
      </section>
      {/* LOCATIONS */}
      <div>
        {totalLocations === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no locations matched your search...
          </h5>
        ) : (
          <div className="mt-12 grid gap-y-8">
            <div className="">
              <p className="text-lg">
                MythGuard locations are expertly camouflaged to blend into the fabric of everyday life—appearing as parks, storefronts, transit hubs, or forgotten alleyways. Invisible to the uninitiated, they reveal themselves only to those who have been granted the Sight.
              </p>
            </div>
            {locations.map(location => {
              const { name, image, subtitle, shortDescription, address, mapIcon } = location;
              const locationId = location.id;

              return (
                <article
                  key={locationId}
                  className="group">
                  <Link href={`/locations/${locationId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 relative ">
                      <CardContent className="p-8 gap-y-2 grid md:grid-cols-3 items-center">
                        <div className="relative w-full h-[200px] overflow-hidden rounded">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded"
                            priority

                          />
                        </div>
                        <div className="flex flex-col p-4 md:px-8 md:col-span-2 gap-y-2 md:gap-y-4">
                          <h2 className="text-xl font-semibold capitalize text-primary">
                            {name}
                          </h2>
                          <p className="italic -mt-2">{subtitle}</p>
                          <p className="text-muted-foreground mt-2">
                            Location: <span className="ms-1">{address}</span>
                          </p>
                          <p>{shortDescription}</p>
                        </div>
                      </CardContent>
                      <div className="absolute md:top-8 bottom-8 right-8 z-5">
                        <Image
                          src={mapIcon}
                          alt={name}
                          width={30}
                          height={43}
                        />
                      </div>
                    </Card>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default LocationContainer;
