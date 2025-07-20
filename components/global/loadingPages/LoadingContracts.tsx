import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingContracts() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ContractLoadingCard />
      <ContractLoadingCard />
    </section>
  );
}

const ContractLoadingCard = () => {
  return (
    <Card className="w-full h-full p-8 gap-y-4">
      <CardHeader>
        <Skeleton className="w-1/3 h-8 " />
      </CardHeader>
      <Skeleton className="h-3/4 w-full" />
    </Card>
  );
};

export default LoadingContracts;
