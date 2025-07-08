'use client'

import { Program } from "@prisma/client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type ProgramSelectorProps = {
    programs: Program[];
    selectedProgram?: Program;
};


export function ProgramSelector({
    programs,
    selectedProgram,
}: ProgramSelectorProps) {
    const [selectedId, setSelectedId] = useState<string>(
        selectedProgram?.id ?? ''
      );

      const handleCheckChange = (id: string, checked: boolean) => {
        setSelectedId(prev =>
          checked ? id : ''
        );
      };


      return (
        <div className="grid gap-2 content-start ">
            <Label className="capitalize">Programs</Label>
            <div className="grid gap-2 max-h-72 overflow-y-auto p-4 border border-border rounded-md scrollbar-none">
                {programs.map(item => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-2 p-2 border rounded-md">
                        <Checkbox
                            name={`program-checkbox-${item.id}`}
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
                name="programId"
                value={selectedId}
            />
        </div>
      )
}