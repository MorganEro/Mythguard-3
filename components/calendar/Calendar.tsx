'use client';

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { CalendarItem } from "./CalendarWrapper";
import { useState } from "react";
import Link from "next/link";

type CalendarProps = {
  items: CalendarItem[];
}

function Calendar({ items }: CalendarProps) {
  const eventDates = items.filter(item => item.type === 'event').map(item => item.date);
  const contractDates = items.filter(item => item.type === 'contract').map(item => item.date);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const selectedItem = selectedDate
    ? items.find(item => new Date(item.date).toDateString() === selectedDate.toDateString())
    : undefined;



  return (
    <div>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays
        navLayout="around"
        fixedWeeks
        modifiers={{ event: eventDates, contract: contractDates }}
        modifiersClassNames={{
          event: 'border border-black',
          contract: 'border border-orange-500',
          selected: 'bg-secondary text-secondary-foreground',

        }}
        classNames={{
          chevron: "fill-primary",
          today: "text-primary font-bold",
        }}
        footer={
          selectedItem && (
            <div className="mt-4 p-4 border rounded bg-muted text-center capitalize">
              <span className="text-muted-foreground font-medium">{selectedItem.type}</span>: 
              <Link
                className="hover:underline text-primary capitalize ps-2"
                href={`/${selectedItem.type}s/${selectedItem.id}`}>
                <strong>{selectedItem.name}</strong>
              </Link>
            </div>
          )}
      />

    </div>
  );
}

export default Calendar;
