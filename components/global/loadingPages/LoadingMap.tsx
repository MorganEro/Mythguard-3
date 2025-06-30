import { Skeleton } from '../../ui/skeleton';

function LoadingMap() {
    return (
      <div
        className="mb-4">
        <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow" />
      </div>
    );
}
export default LoadingMap;
