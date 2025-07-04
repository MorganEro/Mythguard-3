import { CartItemWithProduct } from "@/types";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { Card } from "../ui/card";
function CartItemList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
    return (
        <div>
           {cartItems.map(cartItem => {
            const {id, quantity } = cartItem;
            const { image, name, company, price, id: productId } = cartItem.product;
            return (
            <Card key={id} className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4">
                <FirstColumn name={name} image={image} />
                <SecondColumn name={name} company={company} productId={productId} />
                <ThirdColumn id={id} quantity={quantity} />
                <FourthColumn price={price} />
            </Card>
            )})}
        </div>
    );
}

export default CartItemList;
