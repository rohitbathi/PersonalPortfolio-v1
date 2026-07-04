import { useEffect, useRef, useState } from "react";
import { Hand, Briefcase, Sparkles, Bookmark, Mail } from "lucide-react";

const items = [
  { id: "intro", icon: Hand, label: "Intro" },
  { id: "bento", icon: Sparkles, label: "Highlights" },
  { id: "timeline", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: Bookmark, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function NavPill() {
  const [active, setActive] = useState("intro");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeLine, setActiveLine] = useState({ left: 0, opacity: 0 });

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibility.set(e.target.id, e.intersectionRatio));
        let bestId = active;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = btnRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    // Center a 16px wide line (w-4) under the active button
    setActiveLine({ left: bRect.left - cRect.left + bRect.width / 2 - 8, opacity: 1 });
  }, [active]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div
        ref={containerRef}
        className="relative flex items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-2 backdrop-blur-xl"
      >
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              ref={(el) => {
                btnRefs.current[it.id] = el;
              }}
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              aria-label={it.label}
              aria-current={isActive ? "true" : undefined}
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-accent ${
                isActive
                  ? "text-foreground scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              <it.icon className="h-4 w-4 transition-transform" />
            </a>
          );
        })}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[6px] h-[3px] w-4 rounded-full bg-success shadow-[0_0_8px_var(--success)]"
          style={{
            left: 0,
            transform: `translateX(${activeLine.left}px)`,
            opacity: activeLine.opacity,
            transition: "transform 500ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 300ms ease",
          }}
        />
      </div>
    </nav>
  );
}
