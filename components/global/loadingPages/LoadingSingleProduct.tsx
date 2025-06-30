import { Skeleton } from '../../ui/skeleton';

function LoadingSingleProduct() {
  return (
    <div className="mb-4">
      <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow" />
      <Skeleton className="h-4 w-1/2 mt-4" />
      <Skeleton className="h-4 w-1/4 mt-4" />
      <Skeleton className="h-6 w-[30px] mt-4" />
    </div>
  );
}
export default LoadingSingleProduct;
