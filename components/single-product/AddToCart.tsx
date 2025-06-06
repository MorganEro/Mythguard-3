import { Button } from '../ui/button';

function AddToCart({ productId }: { productId: string }) {
  return (
    <Button
      className="capitalize mt-8"
      size={'lg'}
       onClick={() => {
        // Logic to toggle favorite status
        console.log(`Adding to cart for product ID: ${productId}`);
      }}
      >
      AddToCard
    </Button>
  );
}
export default AddToCart;
