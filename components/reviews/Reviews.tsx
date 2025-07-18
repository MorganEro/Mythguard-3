import { fetchReviewByCategory } from '@/actions/review/review-server-actions';
import { ReviewCategory } from '@/types/review';
import SubSectionTitle from '../global/SubSectionTitle';
import ReviewCard from './ReviewCard';

async function Reviews({
  categoryId,
  category,
}: {
  categoryId: string;
  category: ReviewCategory;
}) {
  const reviews = await fetchReviewByCategory(categoryId, category);
  return (
    <>
      <SubSectionTitle text={`Reviews`} />
      <div className="grid md:grid-cols-2 gap-8 my-2">
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
    </>
  );
}

export default Reviews;
