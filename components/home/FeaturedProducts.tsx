import { fetchFeaturedProducts } from '@/actions/product/product-server-actions';
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import ProductsGrid from '../products/ProductsGrid';

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  if (!products || products.length === 0) return <EmptyList />;

  return (
    <section className="pt-24">
      <SectionTitle text="Featured Products" />
      <ProductsGrid />
    </section>
  );
}
export default FeaturedProducts;
