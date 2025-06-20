export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string, redirectTo?: string }>;

export type Product = {
  id: string;
  name: string;
  company: string;
  price: number;
  description: string;
  featured: boolean;
  image: string;
};

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: number;
  amount: number;
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
