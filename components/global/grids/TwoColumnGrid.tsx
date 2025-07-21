import { cn } from "@/lib/utils";
function TwoColumnGrid({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-8 grid lg:grid-cols-2 gap-8", className)}>
            {children}
        </div>
    );
}

export default TwoColumnGrid;
