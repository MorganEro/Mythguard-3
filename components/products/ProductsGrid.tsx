'use client';

import { formatCurrency } from '@/lib/format';
import { useProductsQuery } from '@/lib/queries/product';
import ProductGridCard from './ProductGridCard';

function ProductsGrid() {
  const { data: products } = useProductsQuery();
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.map(product => {
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
  );
}
export default ProductsGrid;
