import { fetchAllLocations } from '@/actions/location/location-server-actions';
import EmptyList from '@/components/global/EmptyList';
import ItemsCount from '@/components/global/ItemsCount';
import OneColumnGrid from '@/components/global/grids/OneColumnGrid';
import Section from '@/components/global/sections/Section';
import GoogleMapWrapper from '@/components/locations/GoogleMapWrapper';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

async function LocationsPage() {
  const locations = await fetchAllLocations();
  const totalLocations = locations.length;

  return (
    <Section title="Locations">
      <ItemsCount count={totalLocations} text="Location" />
      <Card className="mt-6">
        <CardContent className="p-2">
          <GoogleMapWrapper
            locations={locations.map(loc => ({
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
              updatedAt: loc.updatedAt,
            }))}
          />
        </CardContent>
      </Card>
      {/* LOCATIONS */}
      <OneColumnGrid>
        {totalLocations === 0 ? (
          <EmptyList heading="We are sorry, there are currently no locations in this area" />
        ) : (
          <>
            <p>
              MythGuard locations are expertly camouflaged to blend into the
              fabric of everyday life—appearing as parks, storefronts, transit
              hubs, or forgotten alleyways. Invisible to the uninitiated, they
              reveal themselves only to those who have been granted the Sight.
            </p>
            {locations.map(location => {
              const {
                name,
                image,
                subtitle,
                shortDescription,
                address,
                mapIcon,
              } = location;
              const locationId = location.id;

              return (
                <article
                  key={locationId}
                  className="group">
                  <Link href={`/locations/${locationId}`}>
                    <Card className="transform group-hover:shadow-xl transition-shadow duration-500 relative pb-4 md:pb-0 ">
                      <CardContent className="p-4 gap-y-2 grid md:grid-cols-3 items-center">
                        <div className="relative w-full h-[200px] overflow-hidden rounded">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded"
                            priority
                          />
                        </div>
                        <div className="flex flex-col md:px-8 md:col-span-2 gap-y-2 md:gap-y-4">
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
          </>)}
      </OneColumnGrid>
    </Section>
  );
}
export default LocationsPage;
