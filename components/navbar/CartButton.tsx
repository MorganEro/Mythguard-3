import Link from 'next/link';
import { Button } from '../ui/button';
import { LucideShoppingCart } from 'lucide-react';

async function CartButton() {
  //temp
  const numItemsInCart: number = 9;
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative">
      <Link href="/cart">
        <LucideShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
