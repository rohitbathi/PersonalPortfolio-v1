import { forwardRef, useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "a" | "section";
  href?: string;
  target?: string;
  rel?: string;
}

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  { className, children, onMouseMove, as = "div", ...props },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  };

  const Comp = as as any;
  return (
    <Comp
      ref={(node: HTMLDivElement) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
      }}
      onMouseMove={handleMove}
      className={cn("glow-card", className)}
      {...props}
    >
      {children}
    </Comp>
  );
});
