import db from '@/lib/db';
import { Program } from '@/types';
import { redirect } from 'next/navigation';

export const fetchAllPrograms = ({ search = '' }: { search: string }) => {
  return db.program.findMany({
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
export const fetchAdminPrograms = async () => {
  const programs = await db.program.findMany({
      orderBy: {
          name: 'asc',
      },
  });
  return programs;
};
export const fetchSingleProgram = async (programId: string) => {
  const program = await db.program.findUnique({
      where: {
          id: programId,
      },
  });

  if (!program) redirect('/programs');

  return program;
};