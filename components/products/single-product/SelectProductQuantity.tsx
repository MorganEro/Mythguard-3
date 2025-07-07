import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductQuantityProps = {
  mode: Mode.SingleProduct;
  quantity: number;
  setQuantity: (value: number) => void;
};

type SelectCartItemQuantityProps = {
  mode: Mode.CartItem;
  quantity: number;
  setQuantity: (value: number) => Promise<void>;
  isUpdating: boolean;
};

function SelectProductQuantity(
  props: SelectProductQuantityProps | SelectCartItemQuantityProps
) {
  const { mode, quantity, setQuantity } = props;
  const cartItem = mode === Mode.CartItem;

  if (typeof quantity !== 'number') {
    return null;
  }

  return (
    <>
      <p className="text-sm font-medium mb-2">Quantity:</p>
      <Select
        defaultValue={quantity.toString()}
        onValueChange={value => setQuantity(Number(value))}
        disabled={cartItem ? props.isUpdating : false}>
        <SelectTrigger className={cartItem ? 'w-[75px]' : 'w-[80px]'}>
          <SelectValue placeholder={quantity.toString()} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto ">
          {Array.from({ length: cartItem ? quantity + 10 : 10 }, (_, i) => (
            <SelectItem
              key={i}
              value={(i + 1).toString()}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductQuantity;
