'use server';

import db from '@/utils/db';
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
} from '../../schema';
import type { Product } from '@/utils/types';
import { currentUser } from '@clerk/nextjs/server';
import { deleteImage, uploadImage } from '../../supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkRole } from '../../roles';

const renderError = (error: unknown): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred',
  };
};

export const createProductAction = async (
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
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const file = formData.get('image') as File;

    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });

    uploadedImagePath = await uploadImage(validatedFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
        clerkId: user?.id || '',
      },
    });

    const { name } = validatedFields;

    return {
      message: `Product ${name} created successfully`,
      redirectTo: '/admin/products',
    };
  } catch (error) {
    if (uploadedImagePath) {
      try {
        await deleteImage(uploadedImagePath);
      } catch (deleteError) {
        console.error('Failed to delete image after error:', deleteError);
      }
    }
    return renderError(error);
  }
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(deletedProduct.image);
    const cookieStore = await cookies();
    cookieStore.set(
      'success',
      `Product ${deletedProduct.name} deleted successfully`,
      { maxAge: 5 }
    );
    revalidatePath('/admin/products');
    return { message: 'Product deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

interface ErrorMessage {
  message: string;
}

export const fetchAdminProductDetails = async (
  productId: string
): Promise<Product | ErrorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect('/admin/products');
  return product;
};

export const updateProductAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    const productId = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Product updated successfully', { maxAge: 5 });
    return { message: 'Product updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const image = formData.get('image') as File;
    const productId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const uploadedImagePath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: uploadedImagePath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Product image updated successfully', {
      maxAge: 5,
    });
    return { message: 'Product image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await currentUser();
  const favorite = await db.favorite.findFirst({
    where: { productId, clerkId: user?.id },
    select: { id: true },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  productName: string;
  pathname: string;
}) => {
  const { productId, favoriteId, pathname, productName } = prevState;
  const user = await currentUser();

  if (!user) {
    return { message: 'Unauthorized. Please log in.' };
  }

  try {
    if (favoriteId) {
      // Remove favorite
      await db.favorite.delete({
        where: { id: favoriteId },
      });
    } else {
      // Add favorite
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId
        ? `Product ${productName} removed from favorites`
        : `Product ${productName} added to favorites`,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await currentUser();

  const favorites = await db.favorite.findMany({
    where: { clerkId: user?.id },
    include: { product: true },
  });
  return favorites;
};
