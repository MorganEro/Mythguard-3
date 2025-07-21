import { fetchFeaturedProducts } from '@/actions/product/product-server-actions';
import { formatCurrency } from '@/lib/format';
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/sections/SectionTitle';
import ProductGridCard from '../products/ProductGridCard';

async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();
  if (!featuredProducts || featuredProducts.length === 0) return <EmptyList />;

  return (
    <section className="pt-24">
      <SectionTitle text="Featured Products" />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts &&
          featuredProducts?.map(product => {
            const { name, price, image } = product;
            const productId = product.id;
            const dollarsAmount = formatCurrency(price);

            return (
              <ProductGridCard
                key={productId}
                productId={productId}
                name={name}
                image={image}
                dollarsAmount={dollarsAmount}
              />
            );
          })}
      </div>
    </section>
  );
}
export default FeaturedProducts;
