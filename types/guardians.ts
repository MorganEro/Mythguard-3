import { Guardian, Program } from "@prisma/client";

export type GuardianWithPrograms = Guardian & {
  programs: Program[];
};
