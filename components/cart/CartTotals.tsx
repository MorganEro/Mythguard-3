import { formatCurrency } from "@/lib/format";
import { Cart } from "@prisma/client";
import { Separator } from "../ui/separator";
import { Card, CardTitle } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Button";
import { createOrderAction } from "@/actions/order/order-server-action";

function CartTotals({ cart }: { cart: Cart }) {
    const { shipping, cartTotal, tax, orderTotal } = cart;
    return (
        <div>
            <Card className="p-8 gap-0">
                <CartTotalRow label="Subtotal" amount={cartTotal} />
                <CartTotalRow label="Tax" amount={tax} />
                <CartTotalRow label="Shipping" amount={shipping} />
                <CardTitle className="mt-4">
                    <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
                </CardTitle>
            </Card>
            <FormContainer action={createOrderAction}>
             <SubmitButton text='Place Order' className='w-full mt-8' />
            </FormContainer>

        </div>
    );
}

function CartTotalRow({ label, amount, lastRow }: { label: string, amount: number, lastRow?: boolean }) {
    return (
        <>
            <p className='flex justify-between text-sm'>
                <span>{label}</span>
                <span>{formatCurrency(amount)}</span>
            </p>
            {lastRow ? null : <Separator className="my-2" />}
        </>
    );
}

export default CartTotals;
