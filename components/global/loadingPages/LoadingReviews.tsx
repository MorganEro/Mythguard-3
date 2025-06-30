import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingReviews() {
  return (
    <section className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
}

const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-30 mb-2" />
          </div>
        </div>
      </CardHeader>
      <div className="px-4">
        <Skeleton className="h-8 w-full mb-2" />
      </div>
    </Card>
  );
};

export default LoadingReviews;
