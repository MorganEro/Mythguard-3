'use server';

import db from '@/lib/db';

import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
  type Product,
} from '@/types';
import { auth } from '@clerk/nextjs/server';
import { deleteImage, uploadImage } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkRole } from '@/lib/roles';
import { renderError } from '@/lib/utils/error';

export const fetchAllProducts = async ({ search = '' }: { search: string }) => {
  return db.product.findMany({
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


export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
      where: {
          featured: true,
      },
  });
  return products;
};



export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
      where: {
          id: productId,
      },
  });

  if (!product) redirect('/products');

  return product;
};

export const fetchAdminProducts = async () => {
  const products = await db.product.findMany({
      orderBy: {
          createdAt: 'desc',
      },
  });
  return products;
};
export const createProductAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; redirectTo?: string }> => {
  const { userId } = await auth();
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

    uploadedImagePath = await uploadImage(validatedFile.image, 'PRODUCTS');

    await db.product.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
        clerkId: userId || '',
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
        await deleteImage(uploadedImagePath, 'PRODUCTS');
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

    await deleteImage(deletedProduct.image, 'PRODUCTS');
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
    const uploadedImagePath = await uploadImage(
      validatedFile.image,
      'PRODUCTS'
    );
    await deleteImage(oldImageUrl, 'PRODUCTS');
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
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  const favorite = await db.favorite.findFirst({
    where: { productId, clerkId: userId },
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
  const { userId } = await auth();

  if (!userId) {
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
          clerkId: userId,
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
  const { userId } = await auth();

  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }

  const favorites = await db.favorite.findMany({
    where: { clerkId: userId },
    include: { product: true },
  });
  return favorites;
};
