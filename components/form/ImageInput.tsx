'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useRef } from 'react';
import { toast } from 'sonner';

interface ImageInputProps {
  defaultValue?: string;
  field?: 'image' | 'mapIcon';
}

function ImageInput({ defaultValue, field = 'image' }: ImageInputProps) {
  const name = field;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 1024 * 1024) {
      // 1MB
      toast.error('File size must be less than 1MB');
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="grid w-full items-center gap-2 mb-2">
      <Label
        htmlFor={name}
        className="capitalize">
        {field === 'mapIcon' ? 'Map Icon' : 'Image'}
      </Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        type="file"
        required
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
}
export default ImageInput;
