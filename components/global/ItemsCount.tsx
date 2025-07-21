import { cn } from "@/lib/utils";

function ItemsCount({ count, text, className, children }: { count: number, text: string, className?: string, children?: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center mt-4 w-full">
            <h4 className={cn(
                "text-muted-foreground",
                !children && "ml-auto",
                className
            )}>
                {count} {count === 1 ? text : text + 's'}
            </h4>
            {children}
        </div>
    );
}

export default ItemsCount;
