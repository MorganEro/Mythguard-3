import { Guardian } from '@prisma/client';

export type Program = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type ProgramWithGuardians = Program & {
  guardians: Guardian[];
};
