'use client';

import { useState } from "react";
import SelectProductQuantity, { Mode } from "../products/single-product/SelectProductQuantity";
import { removeCartItemAction, updateCartItemAction } from "@/actions/cart/cart-server-actions";
import { SubmitButton } from "../form/Button";
import FormContainer from "../form/FormContainer";
import { toast } from 'sonner';



function ThirdColumn({id, quantity}: {id: string, quantity: number}) {
const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
const [isUpdating, setIsUpdating] = useState(false);
const handleQuantityChange = async (value: number) => {
    setIsUpdating(true);
    const toastId = toast.loading('Updating quantity...');
    const result = await updateCartItemAction({cartItemId: id, quantity: value});
    setUpdatedQuantity(value);
    toast.dismiss(toastId);
    toast.success(result.message);
    setIsUpdating(false);
};
    return (
        <div className="md:ml-8">
            <SelectProductQuantity mode={Mode.CartItem} quantity={updatedQuantity} setQuantity={handleQuantityChange} isUpdating={isUpdating}/>
            <FormContainer action={removeCartItemAction}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton size="sm" className="mt-4" text="Remove"/>
            </FormContainer>            
        </div>
    );
}

export default ThirdColumn;