import { Prisma } from "@prisma/client";

export type CartItem = {
    productId: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    company: string;
  };

  export type CartState = {
    cartItems: CartItem[];
    numItemsInCart: number;
    cartTotal: number;
    shipping: number;
    tax: number;
    orderTotal: number;
  };
  

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {
        product: true;
    }
}>

