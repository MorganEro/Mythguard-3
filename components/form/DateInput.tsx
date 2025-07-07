'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DateInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: Date | string;
};

function DateInput({ name, labelText, defaultValue }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  return (
    <div className="flex flex-col gap-3">
      <Label
        htmlFor={name}
        className="px-1">
        {labelText}
      </Label>
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name={name}
        value={date ? date.toISOString() : ''}
      />
    </div>
  );
}
export default DateInput;
