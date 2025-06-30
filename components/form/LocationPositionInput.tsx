import { Label } from '../ui/label';
import { Input } from '../ui/input';

type LocationPositionInputProps = {
  name: string;
  type: 'number';
  label?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  defaultValue?: number | string;
  placeholder?: string;
};
function LocationPositionInput({
  name,
  type,
  label,
  min,
  max,
  step,
  defaultValue,
  placeholder,
}: LocationPositionInputProps) {
  return (
    <div className="grid w-2/5 items-center gap-2 mb-2">
      <Label
        htmlFor={name}
        className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step || 'any'}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        required
      />
    </div>
  );
}
export default LocationPositionInput;
