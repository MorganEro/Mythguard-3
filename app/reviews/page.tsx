'use client';

import { fetchAllReviewsByUserWithDetails } from '@/actions/review/review-server-actions';
import LoadingReviews from '@/components/global/loadingPages/LoadingReviews';
import SectionTitle from '@/components/global/SectionTitle';
import DeleteReview from '@/components/reviews/DeleteReview';
import ReviewCard from '@/components/reviews/ReviewCard';
import CategoryFilter from '@/components/ui/categoryFilter';
import { ReviewCategory } from '@/types';
import { useEffect, useState } from 'react';
import { ReviewWithDetails } from '@/types';


const reviewTypeLabels: Record<ReviewCategory, string> = {
  guardian: 'Guardian',
  program: 'Program',
  product: 'Product',
};

function ReviewsPage() {
  const [userReviews, setUserReviews] = useState<ReviewWithDetails[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ReviewCategory[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const reviews = await fetchAllReviewsByUserWithDetails() as ReviewWithDetails[];
      if (!('message' in reviews)) {
        setUserReviews(reviews);
        setFilteredReviews(reviews);
      }
      setLoading(false);
    };
    loadReviews();
  }, []);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredReviews(userReviews);
      return;
    }

    const filtered = userReviews.filter(review => {
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
    setFilteredReviews(filtered);
  }, [selectedTypes, userReviews]);

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
      )}
    </div>
  );
}

export default ReviewsPage;
