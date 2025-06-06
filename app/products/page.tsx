import ProductsContainer from '@/components/products/ProductsContainer';
import { use } from 'react';

function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = use(props.searchParams);
  const { layout = 'grid', search = '' } = searchParams;

  return (
    <ProductsContainer
      layout={layout as 'grid' | 'list'}
      search={search}
    />
  );
}
export default ProductsPage;
