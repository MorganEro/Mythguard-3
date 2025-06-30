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

export type ReviewAllResponse ={
    id: string;
  rating: number;
  comment: string;
  product?: { name: string; image: string } | null;
  guardian?: { name: string; image: string } | null;
  program?: { name: string; image: string } | null;
}