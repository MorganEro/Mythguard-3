import { Button } from '../ui/button';

function AddToCart({ productId }: { productId: string }) {
  console.log(`Adding product with ID: ${productId} to cart`);
  return (
    <Button
      className="capitalize mt-8"
      size={'lg'}>
      AddToCard
    </Button>
  );
}
export default AddToCart;
