'use client';

import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoadingMap from '../global/loadingPages/LoadingMap';
import { Card, CardContent } from '../ui/card';
import { Location } from '@prisma/client';

type Props = {
  locations: Location[];
};

export default function GoogleMapWrapper({ locations }: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);




  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location: Location) => {
      bounds.extend({ lat: location.lat, lng: location.lng });
    });
    map.fitBounds(bounds);
  }, [locations]);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <LoadingMap />;

  return (
    <div className="h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow">
      <GoogleMap
        onLoad={onLoad}
        mapContainerClassName="w-full h-full"
        zoom={6.5}
        center={{ lat: locations[0].lat, lng: locations[0].lng }}
      >
        {locations.map((location: Location) => {
          return (
            <MarkerF
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: location.mapIcon,
                scaledSize: new google.maps.Size(30, 43),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 0),
              }}
              onClick={() =>
                setHoveredMarkerId(
                  (prev) =>
                    prev === location.id ? null : location.id
                )
              }
            />
          );
        })}
        {hoveredMarkerId && (() => {
          const location = locations.find((loc: Location) => loc.id === hoveredMarkerId);
          if (!location) return null;

          return (
            <InfoWindow
              position={{ lat: location.lat, lng: location.lng }}
              onCloseClick={() => setHoveredMarkerId(null)}
            >
              <>
                <Link href={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${location.lat},${location.lng}`} target="_blank" rel="noopener noreferrer" className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-600 hover:underline text-base">
                  Get Directions
                </Link>
                <Card>
                  <Link href={`/locations/${location.id}`}>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-gray-800 text-center p-2 cursor-pointer">
                        <strong className="text-primary text-base">{location.name}</strong>
                        <Image
                          src={location.image}
                          alt={location.name}
                          width={48}
                          height={48}
                          className="rounded w-20 h-20 md:w-24 md:h-24"
                        />
                        <p className="text-foreground">{location.address}</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </>
            </InfoWindow>
          );
        })()}
      </GoogleMap>
    </div>
  );
}
