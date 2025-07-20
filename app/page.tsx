import LoadingContainer from '@/components/global/LoadingContainer';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FreeTransportation from '@/components/home/FreeTransportation';
import Hero from '@/components/home/Hero';
import { Suspense } from 'react';

function HomePage() {
  return (
    <>
      <Hero />
      <FreeTransportation />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
export default HomePage;
