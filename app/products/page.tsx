import { fetchAllProducts } from '@/actions/product/product-server-actions';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsList from '@/components/products/ProductsList';
import LayoutToggle from '@/components/ui/LayoutToggle';
import { Separator } from '@/components/ui/separator';

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout: 'grid' | 'list' }>;
}) {
  const products = await fetchAllProducts();
  const totalProducts = products.length;
  const layout = (await searchParams)?.layout === 'list' ? 'list' : 'grid';

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'}
          </h4>
          <LayoutToggle currentLayout={layout} />
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}
export default ProductsPage;
