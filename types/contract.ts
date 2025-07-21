import { Contract, Guardian, Program } from "@prisma/client";


export type ContractWithGuardianAndProgram = Contract & {
    guardian: Guardian;
    program: Program;
};