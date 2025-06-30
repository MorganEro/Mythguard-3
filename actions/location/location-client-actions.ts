import db from '@/lib/db';
import { redirect } from 'next/navigation';

export const fetchAllLocations = ({ search = '' }: { search: string }) => {
  return db.location.findMany({
      where: {
          OR: [
              {
                  name: {
                      contains: search,
                      mode: 'insensitive',
                  },
              },
          ],
      },
      select: {
        id: true,
        name: true,
        subtitle: true,
        shortDescription: true,
        description: true,
        address: true,
        image: true,
        mapIcon: true,
        lat: true,
        lng: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
          name: 'asc',
      },
  });
};
export const fetchAdminLocations = async () => {
  const locations = await db.location.findMany({
      select: {
        id: true,
        name: true,
        subtitle: true,
        shortDescription: true,
        description: true,
        address: true,
        image: true,
        mapIcon: true,
        lat: true,
        lng: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
          name: 'asc',
      },
  });
  return locations;
};
export const fetchSingleLocation = async (locationId: string) => {
  const location = await db.location.findUnique({
      where: {
          id: locationId,
      },
  });

  if (!location) redirect('/locations');

  return location;
};