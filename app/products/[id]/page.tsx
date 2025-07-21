import { fetchSingleProduct } from '@/actions/product/product-server-actions';
import { fetchExistingReview } from '@/actions/review/review-server-actions';
import Section from '@/components/global/sections/Section';
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import AddToCart from '@/components/products/single-product/AddToCart';
import ProductRating from '@/components/products/single-product/ProductRating';
import Reviews from '@/components/reviews/Reviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import ZoomableImage from '@/components/ui/zoomable-image';
import { formatCurrency } from '@/lib/format';
import { auth } from '@clerk/nextjs/server';

async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);
  const { userId } = await auth();
  const reviewDoesNotExist =
    userId &&
    !(await fetchExistingReview({
      userId,
      categoryId: id,
      category: 'product',
    }));

  return (
    <Section title={name}>
      <BreadCrumbs
        previousName="Products"
        previousLink="/products"
        currentName={name}
      />
      <div className="my-4 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:h-[30rem]">
        {/* IMAGE FIRST COL */}
        <ZoomableImage
          src={image}
          alt={name}
          width={800}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[4/5] w-full md:max-h-[30rem]"
          imageClassName="w-full h-full"
          objectPosition="center"
        />
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold"> {name}</h1>
            <FavoriteToggleButton
              productId={id}
            />
          </div>
          <ProductRating
            productId={id}
            category="product"
          />
          <h4 className="text-xl mt-2"> {company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded">
            {dollarsAmount}
          </p>
          <p className="text-muted-foreground mt-6 leading-8">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
      <Reviews
        categoryId={id}
        category="product"
      />
      {reviewDoesNotExist && (
        <SubmitReview
          categoryId={id}
          category="product"
        />
      )}
    </Section>
  );
}
export default SingleProductPage;
