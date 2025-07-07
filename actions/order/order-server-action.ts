'use server';

import db from '@/lib/db';
import { renderError } from '@/lib/utils/error';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Cart } from '@prisma/client';
import { redirect } from 'next/navigation';
import { fetchOrCreateCart } from '../cart/cart-server-actions';
import { checkRole } from '@/lib/roles';


export const createOrderAction = async (prevState: unknown, formData: FormData) => {
const user = await currentUser();
    if (!user) {
      return { message: 'Unauthorized. Please sign in.' };
    }
    try {
      const cart = await fetchOrCreateCart({ userId: user.id, errorOnFailure: true });
      await db.order.create({
        data: {
          clerkId: user.id,
          products: cart.numItemsInCart,
          orderTotal: cart.orderTotal,
          tax: cart.tax,
          taxRate: cart.taxRate,
          shipping: cart.shipping,
          email: user.emailAddresses[0].emailAddress,
        },
      });
      await db.cart.delete({
        where: {
          id: cart.id,
        },
      });
      return {
        message: `Order created successfully`,
        redirectTo: '/orders',
      };
    } catch (error) {
      return renderError(error);
    }
}

export const fetchUserOrders = async () => {
  const { userId } = await auth();
  if (!userId) {
    return { message: 'Unauthorized. Please sign in.' };
  }
  const orders = await db.order.findMany({
    where: {
      clerkId: userId,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
    if (!checkRole('admin')) {
        return { message: 'Unauthorized. Admin access required.' };
      }

    const orders = await db.order.findMany({
        where: {
          isPaid: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return orders;
}