import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllProducts } from '@/actions/product/product-server-actions';

async function ProductsContainer({
  layout,
  search,
}: {
  layout: 'grid' | 'list';
  search: string | string[];
}) {
  const products = await fetchAllProducts({ search: search as string });
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : '';

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
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="flex items-center gap-2">
              <Link href={`/products?layout=list${searchTerm}`}>
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
export default ProductsContainer;
