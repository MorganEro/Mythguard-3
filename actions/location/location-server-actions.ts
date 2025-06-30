'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { checkRole } from '@/lib/roles';
import { currentUser } from '@clerk/nextjs/server';
import { imageSchema, locationSchema, validateWithZodSchema, type Location } from '@/types';
import { deleteImage, uploadImage } from '@/lib/supabase';
const renderError = (error: unknown): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};

export const createLocationAction = async (
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
    const validatedFields = validateWithZodSchema(locationSchema, rawData);

    const imageFile = formData.get('image') as File;
    const mapIconFile = formData.get('mapIcon') as File;
    
    const validatedImage = validateWithZodSchema(imageSchema, { image: imageFile });
    const validatedMapIcon = validateWithZodSchema(imageSchema, { image: mapIconFile });

    const [uploadedImage, uploadedMapIcon] = await Promise.all([
      uploadImage(validatedImage.image, 'LOCATIONS'),
      uploadImage(validatedMapIcon.image, 'LOCATIONS')
    ]);

    uploadedImagePath = uploadedImage;

    await db.location.create({
      data: {
        ...validatedFields,
        image: uploadedImage,
        mapIcon: uploadedMapIcon,
      },
    });

    const { name } = validatedFields;

    return {
      message: `Location ${name} created successfully`,
      redirectTo: '/admin/locations',
    };
  } catch (error) {
    if (uploadedImagePath) {
      try {
        await deleteImage(uploadedImagePath, 'LOCATIONS');
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

export const fetchAdminLocationDetails = async (
  locationId: string
): Promise<Location | ErrorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  const location = await db.location.findUnique({
    where: {
      id: locationId,
    },
  });
  if (!location) redirect('/admin/locations');
  return location;
};

export const updateLocationAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    const locationId = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(locationSchema, rawData);

    await db.location.update({
      where: {
        id: locationId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/locations/${locationId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Location updated successfully', { maxAge: 5 });
    return { message: 'Location updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateLocationImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const image = formData.get('image') as File;
    const locationId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const uploadedImagePath = await uploadImage(validatedFile.image, 'LOCATIONS');
    await deleteImage(oldImageUrl, 'LOCATIONS');
    const field = formData.get('field') as 'image' | 'mapIcon';
    await db.location.update({
      where: {
        id: locationId,
      },
      data: {
        [field]: uploadedImagePath,
      },
    });
    revalidatePath(`/admin/locations/${locationId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Location image updated successfully', {
      maxAge: 5,
    });
    return { message: 'Location image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteLocationAction = async (
  prevState: { locationId: string }
): Promise<{ message: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    await db.location.delete({
      where: { id: prevState.locationId },
    });

    revalidatePath('/admin/locations');
    return { message: 'Location deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};



