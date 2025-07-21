import { cn } from "@/lib/utils";
import SubSectionTitle from "./SubSectionTitle";

function SubSection({
    children,
    className,
    title,
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
}) {
    return (
        <article className={cn("pt-4", className)}>
            {title && <SubSectionTitle text={title} />}
            {children}
        </article>
    );
}

export default SubSection;
