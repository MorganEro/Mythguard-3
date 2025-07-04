'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { checkRole } from '@/lib/roles';
import {
  Guardian,
  imageSchema,
  programSchema,
  validateWithZodSchema,
  type Program,
} from '@/types';
import { deleteImage, uploadImage } from '@/lib/supabase';
import { renderError } from '@/lib/utils/error';

export const fetchAllPrograms = async ({ search = '' }: { search: string }) => {
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



export const createProgramAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; redirectTo?: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  console.log('Creating program with formData:', formData);

  let uploadedImagePath: string | undefined;

  try {
    const rawData = Object.fromEntries(formData);
    const guardianIdsRaw = formData.getAll('guardianIds');
    const guardianIds = guardianIdsRaw
      .flatMap(ids => ids.toString().split(','))
      .filter(Boolean);
    const dataWithGuardians = {
      ...rawData,
      guardians: guardianIds,
    };
    const validatedFields = validateWithZodSchema(
      programSchema,
      dataWithGuardians
    );

    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });

    uploadedImagePath = await uploadImage(validatedFile.image, 'PROGRAMS');

    await db.program.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
        guardians: guardianIds.length
          ? { connect: guardianIds.map(id => ({ id })) }
          : undefined,
      },
    });

    const { name } = validatedFields;

    return {
      message: `Program ${name} created successfully`,
      redirectTo: '/admin/programs',
    };
  } catch (error) {
    if (uploadedImagePath) {
      try {
        await deleteImage(uploadedImagePath, 'PROGRAMS');
      } catch (deleteError) {
        console.error('Failed to delete image after error:', deleteError);
      }
    }
    return renderError(error);
  }
};

interface ErrorMessage {
  message: string;
}

export const fetchAdminProgramDetails = async (
  programId: string
): Promise<Program | ErrorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  const program = await db.program.findUnique({
    where: {
      id: programId,
    },
  });
  if (!program) redirect('/admin/programs');
  return program;
};

export const updateProgramAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    const programId = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);

    const guardianIdsRaw = formData.getAll('guardianIds');
    const guardianIds = guardianIdsRaw
      .flatMap(ids => ids.toString().split(','))
      .filter(Boolean);
    const dataWithGuardians = {
      ...rawData,
      guardians: guardianIds,
    };
    const validatedFields = validateWithZodSchema(
      programSchema,
      dataWithGuardians
    );

    await db.program.update({
      where: {
        id: programId,
      },
      data: {
        ...validatedFields,
        guardians: {
          set: [],
          connect: guardianIds.map(id => ({ id })),
        },
      },
    });
    revalidatePath(`/admin/programs/${programId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Program updated successfully', { maxAge: 5 });
    return { message: 'Program updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProgramImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const image = formData.get('image') as File;
    const programId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const uploadedImagePath = await uploadImage(
      validatedFile.image,
      'PROGRAMS'
    );
    await deleteImage(oldImageUrl, 'PROGRAMS');
    await db.program.update({
      where: {
        id: programId,
      },
      data: {
        image: uploadedImagePath,
      },
    });
    revalidatePath(`/admin/programs/${programId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Program image updated successfully', {
      maxAge: 5,
    });
    return { message: 'Program image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteProgramAction = async (prevState: {
  programId: string;
}): Promise<{ message: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    await db.program.delete({
      where: { id: prevState.programId },
    });

    revalidatePath('/admin/programs');
    return { message: 'Program deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRelatedGuardians = async (
  programId: string
): Promise<Guardian[] | ErrorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const programs = await db.program.findMany({
      where: {
        id: programId,
      },
      select: {
        guardians: true,
      },
    });
    const guardians = programs.length > 0 ? programs[0].guardians : [];
    if (guardians.length === 0) {
      return [];
    }
    return guardians;
  } catch (error) {
    return renderError(error);
  }
};
