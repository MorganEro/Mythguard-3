'use server';

import db from '@/lib/db';
import { renderError } from '@/lib/utils/error';
import { auth } from '@clerk/nextjs/server';
import { Cart } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};
const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const fetchOrCreateCart = async ({ userId, errorOnFailure = false }: { userId: string, errorOnFailure?: boolean }) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error('Cart not found');
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};
export const updateCart = async (cart: Cart) => { 
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  let numItemsInCart = 0;
  let cartTotal = 0;

  cartItems.forEach((cartItem) => {
    numItemsInCart += cartItem.quantity;
    cartTotal += cartItem.quantity * cartItem.product.price;
  });

  const tax = cartTotal * cart.taxRate;
  const shipping = cartTotal? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart, 
      cartTotal,
      tax,
      shipping,
      orderTotal,
    },
    include: includeProductClause,
  });
  return {currentCart, cartItems};
};
export const fetchCartItems = async () => {
  const { userId } = await auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};
export const updateOrCreateCartItem = async ({cartId, productId, quantity}: {cartId: string, productId: string, quantity: number}) => { 
  let cartItem = await db.cartItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });
  if (!cartItem) {
    cartItem = await db.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  } else {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + quantity,
      },
    });
  }
  return cartItem;
};

export const addToCartAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  try {
    const productId = formData.get('productId') as string;
    const quantity = Number(formData.get('quantity'));
    console.log(quantity)
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId });
    await updateOrCreateCartItem({cartId:cart.id, productId, quantity});
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect('/cart');
};
export const removeCartItemAction = async (prevState: unknown, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) {
      return { message: 'Unauthorized. Please sign in.' };
    }
    try {
      const cartItemId = formData.get('id') as string;
      const cart = await fetchOrCreateCart({ userId, errorOnFailure: true });
      await db.cartItem.delete({
        where: {
          id: cartItemId,
          cartId: cart.id,
        },
      });
      await updateCart(cart);
      revalidatePath('/cart');
      return {message: 'Item removed from cart'}
    } catch (error) {
      return renderError(error);
    }
};
export const updateCartItemAction = async ({cartItemId, quantity}: {cartItemId: string, quantity: number}) => {
    const { userId } = await auth();
    if (!userId) {
      return { message: 'Unauthorized. Please sign in.' };
    }
    try {
      const cart = await fetchOrCreateCart({ userId, errorOnFailure: true });
      await db.cartItem.update({
        where: {
          id: cartItemId,
          cartId: cart.id,
        },
        data: {
          quantity,
        },
      });
      await updateCart(cart);
      revalidatePath('/cart');
      return {message: 'Item updated in cart'}
    } catch (error) {
      return renderError(error);
    }
};


