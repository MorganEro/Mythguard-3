'use client';

import LoadingReviews from '@/components/global/loadingPages/LoadingReviews';
import SectionTitle from '@/components/global/SectionTitle';
import DeleteReview from '@/components/reviews/DeleteReview';
import ReviewCard from '@/components/reviews/ReviewCard';
import CategoryFilter from '@/components/ui/categoryFilter';
import { ReviewCategory } from '@/types';
import { useState, useMemo } from 'react';
import { useUserReviews } from '@/lib/queries/review';

const reviewTypeLabels: Record<ReviewCategory, string> = {
  guardian: 'Guardian',
  program: 'Program',
  product: 'Product',
};

function ReviewsPage() {
  const { data: userReviews = [], isLoading } = useUserReviews();
  const [selectedTypes, setSelectedTypes] = useState<ReviewCategory[]>([]);

  const filteredReviews = useMemo(() => {
    if (selectedTypes.length === 0) return userReviews;

    return userReviews.filter(review => {
      return selectedTypes.some(type => {
        switch (type) {
          case 'product':
            return review.product !== null;
          case 'program':
            return review.program !== null;
          case 'guardian':
            return review.guardian !== null;
          default:
            return false;
        }
      });
    });
  }, [selectedTypes, userReviews]);

  if (isLoading) {
    return <LoadingReviews />;
  }

  return (
    <div className="container py-8">
      <SectionTitle text="My Reviews" />
      <div className="pt-8">
        <CategoryFilter
          categories={reviewTypeLabels}
          selected={selectedTypes}
          onchange={(category, checked) => {
            setSelectedTypes(prev =>
              checked
                ? [...prev, category as ReviewCategory]
                : prev.filter(t => t !== category)
            );
          }}
        />
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
        {filteredReviews.map(review => {
          const { id, comment, rating, product, guardian, program } = review;
          const item = product || guardian || program;
          if (!item) return null;

          return (
            <ReviewCard
              key={id}
              reviewInfo={{
                comment,
                rating,
                image: item.image,
                name: item.name,
              }}
            >
              <DeleteReview reviewId={id} />
            </ReviewCard>
          );
        })}
      </section>
    </div>
  );
}

export default ReviewsPage;
