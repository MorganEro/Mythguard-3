'use server';

import { auth } from '@clerk/nextjs/server';
import { reviewSchema, validateWithZodSchema } from '@/types';
import { ReviewAllResponse } from '@/types';
import db from '@/lib/db';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { renderError } from '@/lib/utils/error';

const fieldMap = {
  product: 'productId',
  guardian: 'guardianId',
  program: 'programId',
} as const;

export const createReviewAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  try {
    const { category, categoryId, ...rawData } = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: userId,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set('success', `Review submitted successfully`, { maxAge: 5 });
    revalidatePath(`/${category}/${categoryId}`);
    return { message: 'Review submitted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: userId,
      },
    });
    revalidatePath('/reviews');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAllReviewsByUser = async (): Promise<
  ReviewAllResponse[] | { message: string }
> => {
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  const reviews = await db.review.findMany({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          name: true,
          image: true,
        },
      },
      guardian: {
        select: {
          name: true,
          image: true,
        },
      },
      program: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews as unknown as ReviewAllResponse[];
};
export const fetchReviewByUserAndCategory = async (
  category: 'product' | 'guardian' | 'program'
): Promise<ReviewAllResponse[] | { message: string }> => {
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  const reviews = await db.review.findMany({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      [category]: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews as unknown as ReviewAllResponse[];
};

export const fetchReviewByCategory = async (
  categoryId: string,
  category: 'product' | 'guardian' | 'program'
) => {
  const field = fieldMap[category];

  return await db.review.findMany({
    where: {
      [field]: categoryId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const fetchRating = async (
  categoryId: string,
  category: 'product' | 'guardian' | 'program'
) => {
  const field = fieldMap[category];

  const result = await db.review.groupBy({
    by: [field],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      [field]: categoryId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? '0',
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchExistingReview = async ({
  userId,
  categoryId,
  category,
}: {
  userId: string;
  categoryId: string;
  category: 'product' | 'guardian' | 'program';
}) => {
  const field = fieldMap[category];
  return db.review.findFirst({
    where: {
      clerkId: userId,
      [field]: categoryId,
    },
  });
};
