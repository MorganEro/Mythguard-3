import { fetchOrCreateCart, updateCart } from "@/actions/cart/cart-server-actions";
import SectionTitle from "@/components/global/SectionTitle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";

async function CartPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/');
  }

  const previousCart = await fetchOrCreateCart({ userId });
  const {currentCart, cartItems} = await updateCart(previousCart);
  if(currentCart.numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />
  }
  
  return <>
    <SectionTitle text="Shopping cart" />
    <div className='mt-8 grid gap-4 lg:grid-cols-12'>
      <div className='lg:col-span-8'>
        <CartItemList cartItems={cartItems  } />
      </div>
      <div className='lg:col-span-4'>
        <CartTotals cart={currentCart} />
      </div>
    </div>
  </>;
}
export default CartPage;
