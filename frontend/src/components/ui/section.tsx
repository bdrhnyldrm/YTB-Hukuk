import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "muted" | "gradient";
}

export function Section({ children, className, background = "default" }: SectionProps) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-b from-background to-muted/20",
  };

  return (
    <section className={cn(
      "section-padding",
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  );
}