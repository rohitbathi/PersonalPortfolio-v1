import { useEffect, useRef, useState } from "react";
import { GlowCard } from "./GlowCard";

interface WorkItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface EduItem {
  school: string;
  degree: string;
  period: string;
}

const work: WorkItem[] = [
  {
    company: "CellaNova Technologies",
    role: "Founding AI Engineer",
    period: "May 2025 — Present",
    highlights: [
      "Built a full-stack AI document-generation platform (Next.js, FastAPI) that turns RFPs into citation-grounded drafts, saving 85%+ of writer time.",
      "Engineered a PDF/DOCX ingestion + OCR pipeline with Docling, OpenAI embeddings, and Pinecone — 280+ docs at 94.3% clean extraction.",
      "Designed a 3-stage evidence-matching pipeline with LangSmith evals reaching 96.2% claim traceability.",
      "Shipped a reviewer workflow with SSE streaming, RBAC, audit logging — 97.4% generation success rate.",
    ],
  },
  {
    company: "ApplyLoom (Founding Project)",
    role: "Founding Engineer",
    period: "Aug 2024 — Dec 2024",
    highlights: [
      "Shipped ApplyLoom 0→1 — Next.js + Supabase platform scaling to 1,000+ users, plus a Chrome extension across LinkedIn, Indeed and more.",
      "Built a real-time mock-interview engine with AI personas and A/B-tested intent routing over LiveKit at sub-300ms latency.",
      "Fine-tuned Llama 3.3 70B with SFT + LoRA on GCP Model Garden — 90% lower LLM cost, p95 latency 2s.",
    ],
  },
  {
    company: "Cypheryard",
    role: "AI Software Developer",
    period: "Jan 2023 — Jun 2023",
    highlights: [
      "Developed a low-latency Voice AI agent on Twilio Media Streams + Amazon Transcribe — sub-800ms turn-taking.",
      "Orchestrated an outbound outreach engine on SQS + Lambda, scaling candidate engagement 5x.",
    ],
  },
];

const education: EduItem[] = [
  {
    school: "Arizona State University",
    degree: "M.S. Computer Science · 3.6 GPA",
    period: "2025",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech Computer Science · 8.54/10",
    period: "2023",
  },
];

function WorkCard({ item, active }: { item: WorkItem; active: boolean }) {
  return (
    <div className="relative pl-8">
      <span
        className={`absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ${
          active
            ? "border-success bg-success shadow-[0_0_12px_var(--success)]"
            : "border-border bg-card"
        }`}
      />
      <GlowCard
        className={`bento-card p-6 transition-all duration-500 ${
          active ? "border-success/30" : ""
        }`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-foreground">{item.company}</div>
            <div className="text-sm text-muted-foreground">{item.role}</div>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {item.period}
          </div>
        </div>

        <div
          className="grid transition-all duration-500 ease-out"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            opacity: active ? 1 : 0,
            marginTop: active ? "1rem" : "0",
          }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5">
              {item.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-success" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

function EduCard({ item, active }: { item: EduItem; active: boolean }) {
  return (
    <div className="relative pl-8">
      <span
        className={`absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ${
          active
            ? "border-success bg-success shadow-[0_0_12px_var(--success)]"
            : "border-border bg-card"
        }`}
      />
      <GlowCard
        className={`bento-card p-6 transition-all duration-500 ${
          active ? "border-success/30" : ""
        }`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-base font-semibold text-foreground">{item.school}</div>
            <div className="text-sm text-muted-foreground">{item.degree}</div>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {item.period}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

export function Timeline({ scrollProgress = 1 }: { scrollProgress?: number }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Compute active card index exclusively on desktop
  const workActiveIndex = isDesktop
    ? Math.min(work.length - 1, Math.floor(scrollProgress / (1 / work.length)))
    : -1;

  const eduActiveIndex = isDesktop
    ? Math.min(education.length - 1, Math.floor(scrollProgress / (1 / education.length)))
    : -1;

  // Work column translates in steps to align the active card at the top
  const translateY = isDesktop ? workActiveIndex * 110 : 0;
  // Education column translates in steps
  const eduTranslateY = isDesktop ? eduActiveIndex * 110 : 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
      {/* Work */}
      <div>
        <div className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Work
        </div>
        <div className="relative lg:h-[450px] lg:overflow-hidden">
          <div
            className="relative lg:transition-transform lg:duration-500 lg:ease-out"
            style={{
              transform: isDesktop ? `translateY(-${translateY}px)` : "none"
            }}
          >
            {/* Timeline background track */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
            
            {/* Timeline active progress bar */}
            <div
              className="absolute left-0 top-2 w-px bg-success shadow-[0_0_8px_var(--success)] transition-all duration-500"
              style={{
                height: `${scrollProgress * 100}%`,
                maxHeight: "calc(100% - 16px)"
              }}
            />

            <div className="space-y-5">
              {work.map((w, i) => {
                const active = isDesktop ? workActiveIndex === i : true;
                return <WorkCard key={w.company} item={w} active={active} />;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Education
        </div>
        <div className="relative lg:h-[450px] lg:overflow-hidden">
          <div
            className="relative lg:transition-transform lg:duration-500 lg:ease-out"
            style={{
              transform: isDesktop ? `translateY(-${eduTranslateY}px)` : "none"
            }}
          >
            {/* Timeline background track */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
            
            {/* Timeline active progress bar */}
            <div
              className="absolute left-0 top-2 w-px bg-success shadow-[0_0_8px_var(--success)] transition-all duration-500"
              style={{
                height: `${scrollProgress * 100}%`,
                maxHeight: "calc(100% - 16px)"
              }}
            />

            <div className="space-y-5">
              {education.map((e, i) => {
                const active = isDesktop ? eduActiveIndex === i : true;
                return <EduCard key={e.school} item={e} active={active} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
