'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';
import { formatCurrency } from '@/lib/format';
import { useProductsQuery } from '@/lib/queries/product';

function ProductsList() {
  const { data: products } = useProductsQuery();
  return (
    <div className="mt-12 grid gap-y-8">
      {products?.map(product => {
        const { name, price, image, company, description } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = product.id;

        return (
          <article
            key={productId}
            className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 max-w-[100rem]">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>
                  <div>
                  <h2 className="text-xl  capitalize font-bold tracking-wider text-primary">{name}</h2>
                  <h4 className="text-sm text-muted-foreground">{company}</h4>
                    <p className="text-sm mt-4">{description}</p>
                  </div>
                  <p className="text-2xl font-semibold">{dollarsAmount}</p>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton
                productId={productId}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsList;
