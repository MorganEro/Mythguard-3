'use client';

import ThreeColumnGrid from '@/components/global/grids/ThreeColumnGrid';
import LoadingReviews from '@/components/global/loadingPages/LoadingReviews';
import Section from '@/components/global/sections/Section';
import DeleteReview from '@/components/reviews/DeleteReview';
import ReviewCard from '@/components/reviews/ReviewCard';
import CategoryFilter from '@/components/ui/categoryFilter';
import { useUserReviews } from '@/lib/queries/review';
import { ReviewCategory } from '@/types';
import { useMemo, useState } from 'react';

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
    <Section title="My Reviews">
      <div className="pt-4">
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

      <ThreeColumnGrid>
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
      </ThreeColumnGrid>
    </Section>
  );
}

export default ReviewsPage;
