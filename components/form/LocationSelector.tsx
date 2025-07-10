'use client'

import { Location } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type LocationSelectorProps = {
    locations: Location[];
    selectedLocation?: Location;
};


export function LocationSelector({
    locations,
    selectedLocation,
}: LocationSelectorProps) {
    const [selectedId, setSelectedId] = useState<string>(
        selectedLocation?.id ?? ''
      );

      const handleCheckChange = (id: string, checked: boolean) => {
        setSelectedId(checked ? id : '');
      };


      return (
        <div className="grid gap-2 content-start">
            <Label className="capitalize">Locations</Label>
            <div className="grid gap-2 max-h-72 overflow-y-auto p-4 border border-border rounded-md scrollbar-none">
                {locations.map(item => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-2 p-2 border rounded-md">
                        <Checkbox
                            name={`location-checkbox-${item.id}`}
                            id={item.id}
                            checked={selectedId === item.id}
                            onCheckedChange={checked =>
                                handleCheckChange(item.id, checked as boolean)
                            }
                        />
                        <Label htmlFor={item.id}>{item.name}</Label>
                    </div>
                ))}
            </div>
            <input
                type="hidden"
                name="locationId"
                value={selectedId}
            />
        </div>
      )
}