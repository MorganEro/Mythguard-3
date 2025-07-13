import { Product, Guardian, Program } from "@prisma/client";

export type ReviewCategory = 'guardian' | 'program' | 'product';

export type Review = {
    id: string;
    productId?: string;
    guardianId?: string;
    programId?: string;
    clerkId: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    comment: string;
    authorName: string;
    authorImageUrl: string;
    category: ReviewCategory;
}


export type ReviewDisplay = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    comment: string;
    authorName: string;
    authorImageUrl: string;
    category: ReviewCategory;
}

export type ReviewWithDetails = Review & {
  product?: Product | null;
  guardian?: Guardian | null;
  program?: Program | null;
};