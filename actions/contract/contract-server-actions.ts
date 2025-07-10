'use server';

import { contractSchema, validateWithZodSchema } from "@/types/zod-schema";
import db from "@/lib/db";
import { renderError } from "@/lib/utils/error";
import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import { Contract } from "@prisma/client";
import { revalidatePath } from "next/cache";

function canAccessContract(userId: string, isAdmin: boolean, contractData?: Contract | Contract[]) {
    if (!contractData) return isAdmin;
    if (Array.isArray(contractData)) {
        return contractData.some(contract => contract.clerkId === userId) || isAdmin;
    }
    return contractData.clerkId === userId || isAdmin;
}

export const fetchAllContracts = async () => {
    if (!checkRole('admin')) {
        return { message: 'Unauthorized. Admin access required.' };
    }
    const contracts = await db.contract.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return contracts;
}
export const fetchAllUsersContracts = async ({userId}: {userId: string}) => {

    const contracts = await db.contract.findMany({
        where: {
            clerkId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    if (!contracts) redirect('/contracts/create');
    const isAdmin = await checkRole('admin');
    if (!canAccessContract(userId, isAdmin, contracts)) {
        return { message: 'Unauthorized to access this contract.' };
    }
    return contracts;
}

export const fetchNumberOfContracts = async () => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    const contracts = await db.contract.findMany({
        where: {
            clerkId: userId,
        },
    });
    return contracts?.length || 0;
}

export const fetchSingleContractWithRelatedFields = async (contractId: string) => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    const contract = await db.contract.findUnique({
        where: {
            id: contractId,
        },
        include: {
            guardian: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            program: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    if (!contract) redirect('/contracts/create');
    const isAdmin = await checkRole('admin');

    if (!canAccessContract(userId, isAdmin, contract)) {
        return { message: 'Unauthorized to access this contract.' };
    }
    return contract;
}

export const createContractAction = async (prevState: unknown, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    try {
        const rawData = Object.fromEntries(formData);
        const guardianId = formData.get('guardianId') as string;
        const programId = formData.get('programId') as string;
        const validatedFields = validateWithZodSchema(contractSchema, rawData);
        console.log(validatedFields);
        
        await db.contract.create({
            data: {
                ...validatedFields,
                clerkId: userId,
                guardian: {
                    connect: { id: guardianId },
                },
                program: {
                    connect: { id: programId },
                },
            },
        });
        const { name } = validatedFields;
        return {
            message: `${name} contract created successfully`,
            redirectTo: '/contracts',
        };
    } catch (error) {
        return renderError(error);
    }
}


export const updateContractAction = async (prevState: unknown, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    try {
        const rawData = Object.fromEntries(formData);
        const guardianId = formData.get('guardianId') as string;
        const programId = formData.get('programId') as string;
        const validatedFields = validateWithZodSchema(contractSchema, rawData);
        const contract = await db.contract.update({
            where: {
                id: formData.get('id') as string,
            },
            data: {
                ...validatedFields,
                guardian: {
                    connect: { id: guardianId },
                },
                program: {
                    connect: { id: programId },
                },
            },
        });
        const { name } = contract;
        return {
            message: `${name} contract updated successfully`,
            redirectTo: '/contracts',
        };
    } catch (error) {
        return renderError(error);
    }
}

export const deleteContractAction = async (prevState: {
    contractId: string;
}): Promise<{ message: string }> => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    const contract = await db.contract.findUnique({
        where: {
            id: prevState.contractId,
        },
    });
    if (!contract) redirect('/contracts');
    const isAdmin = await checkRole('admin');

    if (!canAccessContract(userId, isAdmin, contract)) {
        return { message: 'Unauthorized to delete this contract.' };
    }

    try {
        await db.contract.delete({
            where: { id: prevState.contractId },
        });

        revalidatePath('/contracts');
        return { message: 'Contract deleted successfully' };
    } catch (error) {
        return renderError(error);
    }
};

export const fetchRelatedGuardian = async (contractId: string) => {
    const contract = await db.contract.findUnique({
        where: {
            id: contractId,
        },
        include: {
            guardian: true,
        },
    });
    if (!contract) redirect('/contracts');
    return contract.guardian;
}

export const fetchRelatedProgram = async (contractId: string) => {
    const contract = await db.contract.findUnique({
        where: {
            id: contractId,
        },
        include: {
            program: true,
        },
    });
    if (!contract) redirect('/contracts');
    return contract.program;
}

