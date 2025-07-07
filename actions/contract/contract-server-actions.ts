'use server';

import { contractSchema, validateWithZodSchema } from "@/types/zod-schema";
import db from "@/lib/db";
import { renderError } from "@/lib/utils/error";
import { auth } from "@clerk/nextjs/server";

export const createContractAction = async (prevState: unknown, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) {
        return { message: 'Unauthorized. Please sign in.' };
    }
    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(contractSchema, rawData);
        
        await db.contract.create({
            data: {
                ...validatedFields,
                clerkId: userId,
            },
        });
        return {
            message: `Contract created successfully`,
            redirectTo: '/contracts',
        };
    } catch (error) {
        return renderError(error);
    }
}
    
