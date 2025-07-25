'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import SelectProductQuantity, { Mode } from './SelectProductQuantity';
import FormContainer from '@/components/form/FormContainer';
import { CartSignInButton, SubmitButton } from '@/components/form/Button';
import { addToCartAction } from '@/actions/cart/cart-server-actions';

function AddToCart({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const { userId } = useAuth();
  return (
    <div className="mt-4">
      <SelectProductQuantity
        mode={Mode.SingleProduct}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input
            type="hidden"
            name="productId"
            value={productId}
          />
          <input
            type="hidden"
            name="quantity"
            value={quantity}
          />
          <SubmitButton
            text="Add to cart"
            className="mt-8"
          />
        </FormContainer>
      ) : (
        <CartSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
