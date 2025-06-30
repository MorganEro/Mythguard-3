'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { checkRole } from '@/lib/roles';
import { auth, currentUser } from '@clerk/nextjs/server';
import { imageSchema, guardianSchema, validateWithZodSchema, type Guardian } from '@/types';
import { deleteImage, uploadImage } from '@/lib/supabase';
const renderError = (error: unknown): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};

export const createGuardianAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; redirectTo?: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  let uploadedImagePath: string | undefined;

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(guardianSchema, rawData);

    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });

    uploadedImagePath = await uploadImage(validatedFile.image, 'GUARDIANS');

    await db.guardian.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
      },
    });

    const { name } = validatedFields;

    return {
      message: `Guardian ${name} created successfully`,
      redirectTo: '/admin/guardians',
    };
  } catch (error) {
    if (uploadedImagePath) {
      try {
        await deleteImage(uploadedImagePath, 'GUARDIANS');
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

export const fetchAdminGuardianDetails = async (
  guardianId: string
): Promise<Guardian | ErrorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  const guardian = await db.guardian.findUnique({
    where: {
      id: guardianId,
    },
  });
  if (!guardian) redirect('/admin/guardians');
  return guardian;
};

export const updateGuardianAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    const guardianId = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(guardianSchema, rawData);

    await db.guardian.update({
      where: {
        id: guardianId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/guardians/${guardianId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Guardian updated successfully', { maxAge: 5 });
    return { message: 'Guardian updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateGuardianImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const image = formData.get('image') as File;
    const guardianId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const uploadedImagePath = await uploadImage(validatedFile.image, 'GUARDIANS');
    await deleteImage(oldImageUrl, 'GUARDIANS');
    await db.guardian.update({
      where: {
        id: guardianId,
      },
      data: {
        image: uploadedImagePath,
      },
    });
    revalidatePath(`/admin/guardians/${guardianId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Guardian image updated successfully', {
      maxAge: 5,
    });
    return { message: 'Guardian image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteGuardianAction = async (
  prevState: { guardianId: string }
): Promise<{ message: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    await db.guardian.delete({
      where: { id: prevState.guardianId },
    });

    revalidatePath('/admin/guardians');
    return { message: 'Guardian deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchLikeId = async ({ guardianId }: { guardianId: string }) => {
  const { userId} = await auth();

  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  const like = await db.like.findFirst({
    where: { guardianId, clerkId: userId },
    select: { id: true },
  });
  return like?.id || null;
};

export const toggleLikeAction = async (prevState: {
  guardianId: string;
  likeId: string | null;
  guardianName: string;
  pathname: string;
}) => {
  const { guardianId, likeId, pathname, guardianName } = prevState;
  const { userId} = await auth();

  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  
  try {
    if (likeId) {
      // Remove favorite
      await db.like.delete({
        where: { id: likeId },
      });
    } else {
      // Add favorite
      await db.like.create({
        data: {
          guardianId,
          clerkId: userId,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: likeId
        ? `Guardian ${guardianName} has been unliked`
        : `Guardian ${guardianName} is liked`,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserLikes = async () => {
  const { userId} = await auth();

  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }

  const likes = await db.like.findMany({
    where: { clerkId: userId },
    include: { guardian: true },
  });
  return likes;
};
