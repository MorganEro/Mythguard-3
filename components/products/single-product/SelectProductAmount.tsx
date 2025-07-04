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

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;
  const cartItem = mode === Mode.CartItem;
  return (
    <>
      <h4>Amount:</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={value => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}>
        <SelectTrigger className={cartItem ? 'w-[50px]' : 'w-[70px]'}>
          <SelectValue placeholder={amount.toString()} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, i) => (
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
export default SelectProductAmount;
