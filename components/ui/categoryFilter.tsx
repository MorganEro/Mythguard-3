import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

type CategoryFilterProps<T extends string> ={
    categories: Record<T, string>,
    selected: T[],
    onchange: (category: T, checked: boolean) => void
    className?: string

}


function CategoryFilter<T extends string>({categories, selected, onchange, className}: CategoryFilterProps<T>) {
    return (
        <div className={cn("flex gap-4 flex-wrap", className)}>
            {Object.entries(categories).map(([type, label]) => (
                <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                        id={type}
                        checked={selected?.includes(type as T)}
                        onCheckedChange={(checked) =>
                            onchange(type as T, checked as boolean)
                        }
                    />
                    <label htmlFor={type} className="text-sm font-medium">
                        {label as string }
                    </label>
                </div>
            ))}
        </div>
    )
}

export default CategoryFilter
