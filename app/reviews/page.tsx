'use client';

import {
  fetchAllReviewsByUser,
  fetchReviewByUserAndCategory,
} from '@/actions/review/review-server-actions';
import { ReviewAllResponse, ReviewCategory } from '@/types';
import { useState, useEffect } from 'react';
import CategoryFilter from '@/components/ui/categoryFilter';
import ReviewCard from '@/components/reviews/ReviewCard';
import LoadingReviews from '@/components/global/loadingPages/LoadingReviews';
import SectionTitle from '@/components/global/SectionTitle';
import DeleteReview from '@/components/reviews/DeleteReview';

const reviewTypeLabels: Record<ReviewCategory, string> = {
  guardian: 'Guardian',
  program: 'Program',
  product: 'Product',
};

function ReviewsPage() {
  const [selectedTypes, setSelectedTypes] = useState<ReviewCategory[]>([]);
  const [reviews, setReviews] = useState<ReviewAllResponse[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      if (selectedTypes.length === 0) {
        const all = await fetchAllReviewsByUser();
        setReviews(all as ReviewAllResponse[]);
      } else {
        const results = await Promise.all(
          selectedTypes.map(type => fetchReviewByUserAndCategory(type))
        );
        setReviews(results as unknown as ReviewAllResponse[]);
      }
      setLoading(false);
    };

    loadReviews();
  }, [selectedTypes]);

  const toggleType = (type: ReviewCategory, checked: boolean) => {
    setSelectedTypes(prev =>
      checked ? [...prev, type] : prev.filter(t => t !== type)
    );
  };
  return (
    <div className="space-y-6">
      <SectionTitle text="My Reviews" />
      <CategoryFilter
        categories={reviewTypeLabels}
        selected={selectedTypes}
        onchange={toggleType}
      />

      {loading ? (
        <LoadingReviews />
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(review => {
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
                }}>
                <DeleteReview reviewId={id} />
              </ReviewCard>
            );
          })}
        </section>
      )}
    </div>
  );
}
export default ReviewsPage;
