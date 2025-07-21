import { cn } from "@/lib/utils";
function OneColumnGrid({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-8 grid gap-y-8 justify-center", className)}>
            {children}
        </div>
    );
}

export default OneColumnGrid;
