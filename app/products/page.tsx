import { fetchProductCount } from '@/actions/product/product-server-actions';
import Section from '@/components/global/sections/Section';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsList from '@/components/products/ProductsList';
import LayoutToggle from '@/components/ui/LayoutToggle';
import ItemsCount from '@/components/global/ItemsCount';
import EmptyList from '@/components/global/EmptyList';

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout: 'grid' | 'list' }>;
}) {
  const totalProducts = await fetchProductCount();
  const layout = (await searchParams)?.layout === 'grid' ? 'grid' : 'list';

  return (
    <Section title="Products">

       <ItemsCount count={totalProducts} text="Product">
        <LayoutToggle currentLayout={layout} />
      </ItemsCount>
      <div>
        {totalProducts === 0 ? (
          <EmptyList heading="There are currently no products in stock" />
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </Section>
  );
}
export default ProductsPage;
