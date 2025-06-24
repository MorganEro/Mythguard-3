import db from '@/lib/db';
import { Guardian } from '@/types';
import { redirect } from 'next/navigation';

export const fetchAllGuardians = ({ search = '' }: { search: string }) => {
  return db.guardian.findMany({
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
      orderBy: {
          name: 'asc',
      },
  });
};
export const fetchAdminGuardians = async () => {
  const guardians = await db.guardian.findMany({
      orderBy: {
          name: 'asc',
      },
  });
  return guardians;
};
export const fetchSingleGuardian = async (guardianId: string) => {
  const guardian = await db.guardian.findUnique({
      where: {
          id: guardianId,
      },
  });

  if (!guardian) redirect('/guardians');

  return guardian;
};