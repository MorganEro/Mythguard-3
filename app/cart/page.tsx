import { fetchOrCreateCart, updateCart } from "@/actions/cart/cart-server-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Section from "@/components/global/sections/Section";
import EmptyList from "@/components/global/EmptyList";

async function CartPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/');
  }

  const previousCart = await fetchOrCreateCart({ userId });
  const {currentCart, cartItems} = await updateCart(previousCart);
  
  
  return <>
    <Section title="Shopping cart">
      {currentCart.numItemsInCart === 0 ? (
        <EmptyList heading="Your cart is empty" />
      ) : (
    <div className='mt-8 grid gap-4 lg:grid-cols-12'>
      <BreadCrumbs
        homeName="Products"
        homeLink="/products"
        currentName="Shopping cart"
      />
      <div className='lg:col-span-8'>
        <CartItemList cartItems={cartItems  } />
      </div>
      <div className='lg:col-span-4'>
        <CartTotals cart={currentCart} />
      </div>
    </div>
    )}
    </Section>
  </>;
}
export default CartPage;
