import Link from 'next/link';
import { Button } from '../ui/button';
import { LucideShoppingCart } from 'lucide-react';
import { fetchCartItems } from '@/actions/cart/cart-server-actions';

async function CartButton() {
  const numItemsInCart = await fetchCartItems();
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative">
      <Link href="/cart">
        <LucideShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
          {numItemsInCart.toString() || '0'}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
