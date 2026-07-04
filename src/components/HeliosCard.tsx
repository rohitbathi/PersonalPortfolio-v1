import { ArrowUpRight, Sparkles } from "lucide-react";

export function HeliosCard() {
  return (
    <a
      href="https://helios.atimuss.com/"
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col"
    >
      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        Featured project
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-hero-glow">
        <iframe
          src="https://helios.atimuss.com/"
          title="Helios by Atimuss"
          loading="lazy"
          className="pointer-events-none absolute left-0 top-0 h-[900px] w-[1400px] origin-top-left scale-[0.32]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-foreground">Helios by Atimuss</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            An intelligent recruiting platform — AI agents that source, screen, and
            engage candidates at scale.
          </p>
        </div>
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/40 transition-all group-hover:border-success/50 group-hover:bg-success/10">
          <ArrowUpRight className="h-4 w-4 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
