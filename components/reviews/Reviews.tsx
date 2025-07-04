import { ReviewCategory } from '@/types/review';
import { fetchReviewByCategory } from '@/actions/review/review-server-actions';
import ReviewCard from './ReviewCard';
import SubSectionTitle from '../global/SubSectionTitle';

async function Reviews({
  categoryId,
  category,
}: {
  categoryId: string;
  category: ReviewCategory;
}) {
  const reviews = await fetchReviewByCategory(categoryId, category);
  return (
    <div className="mt-16">
      <SubSectionTitle text={`Reviews`} />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map(review => {
          const { comment, rating, authorName, authorImageUrl } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };
          return (
            <ReviewCard
              key={review.id}
              reviewInfo={reviewInfo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
