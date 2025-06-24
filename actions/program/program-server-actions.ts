'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { checkRole } from '@/lib/roles';
import { currentUser } from '@clerk/nextjs/server';
import { imageSchema, programSchema, validateWithZodSchema, type Program } from '@/types';
import { deleteImage, uploadImage } from '@/lib/supabase';
const renderError = (error: unknown): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};

export const createProgramAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; redirectTo?: string }> => {
  const user = await currentUser();
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  let uploadedImagePath: string | undefined;

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(programSchema, rawData);

    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });

    uploadedImagePath = await uploadImage(validatedFile.image, 'PROGRAMS');

    await db.program.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
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
    const validatedFields = validateWithZodSchema(programSchema, rawData);

    await db.program.update({
      where: {
        id: programId,
      },
      data: {
        ...validatedFields,
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
    const uploadedImagePath = await uploadImage(validatedFile.image, 'PROGRAMS');
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

export const deleteProgramAction = async (
  prevState: { programId: string }
): Promise<{ message: string }> => {
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



