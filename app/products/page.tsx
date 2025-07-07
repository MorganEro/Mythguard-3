import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllProducts } from '@/actions/product/product-server-actions';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsList from '@/components/products/ProductsList';

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout: 'grid' | 'list' };
}) {
  const products = await fetchAllProducts();
  const totalProducts = products.length;
  const layout = searchParams?.layout === 'list' ? 'list' : 'grid';

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-lg">
            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              asChild
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/products?layout=grid`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/products?layout=list`}>
                <LuList />
              </Link>
            </Button>
          </div>
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
