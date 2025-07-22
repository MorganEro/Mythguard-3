import { Guardian, Like, Program } from "@prisma/client";

export type GuardianWithPrograms = Guardian & {
  programs: Program[];
};

export type LikeWithGuardian = Like & {
  guardian: Guardian;
};  