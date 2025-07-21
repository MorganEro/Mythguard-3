import { cn } from "@/lib/utils";
import SectionTitle from "./SectionTitle";

function Section({
    children,
    className,
    title,
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
}) {
    return (
        <section className={cn("pt-8", className)}>
            {title && <SectionTitle text={title} />}
            {children}
        </section>
    );
}

export default Section;
