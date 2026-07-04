import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  FileText,
  Mail,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Zap,
} from "lucide-react";
import { NavPill } from "@/components/NavPill";
import { GlowCard } from "@/components/GlowCard";
import { SectionLabel } from "@/components/SectionLabel";
import { GithubContributions } from "@/components/GithubContributions";
import { TechStack } from "@/components/TechStack";
import { HeliosCard } from "@/components/HeliosCard";
import { Timeline } from "@/components/Timeline";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function KeyCap({
  href,
  icon: Icon,
  label,
  wide,
  external,
}: {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  wide?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      className={`key-cap key-cap-hover group flex h-16 items-center justify-center gap-2 text-muted-foreground hover:text-foreground ${
        wide ? "px-5" : "w-20"
      }`}
    >
      {Icon && (
        <Icon className="h-6 w-6 transition-transform group-hover:scale-90" strokeWidth={1.5} />
      )}
      {wide && <span className="font-mono text-[13px] uppercase tracking-widest">{label}</span>}
    </a>
  );
}

function Hero() {
  return (
    <section id="intro" className="relative min-h-screen w-full overflow-hidden bg-hero-glow">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pt-32 pb-16">
        {/* <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium text-foreground">Available for projects</span>
        </div> */}

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Hi, I'm Rohit.
          <br />
          <span className="text-muted-foreground">A Founding AI Engineer.</span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I build and scale production AI systems — agentic workflows, voice AI with sub-500ms
          speech-to-speech, and RAG architectures used by thousands.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-1.5">
          <KeyCap href="https://github.com/rohitbathi" icon={Github} label="Github" external />
          <KeyCap
            href="https://linkedin.com/in/rohitbathi"
            icon={Linkedin}
            label="LinkedIn"
            external
          />
          <KeyCap href="/rohitbathi_resume.pdf" icon={FileText} label="Resume" external />
          <KeyCap href="mailto:bathirohit@gmail.com" icon={Mail} label="Email" />
          <KeyCap href="#bento" label="Explore more" wide />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="mb-4">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Bento() {
  return (
    <section id="bento" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="mb-10">
        <SectionLabel>Highlights</SectionLabel>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 auto-rows-[minmax(0,auto)]">
        {/* Helios featured — big */}
        <GlowCard className="bento-card sm:col-span-4 sm:row-span-2 p-5">
          <HeliosCard />
        </GlowCard>

        {/* Location */}
        <GlowCard className="bento-card sm:col-span-2 sm:row-span-2 p-5 flex flex-col justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </div>
            <div className="text-lg font-semibold text-foreground">San Francisco</div>
            <div className="text-sm text-muted-foreground">California, USA</div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Working remotely with teams building AI-native products.
            </p>
          </div>
          <div className="relative mt-6 flex h-32 items-center justify-center rounded-xl border border-border/40 bg-secondary/10 overflow-hidden">
            {/* Subtle grid map background */}
            <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-30" />
              <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-success shadow-[0_0_10px_var(--success)]" />
            </div>
            <div className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
              37.7749° N, 122.4194° W
            </div>
          </div>
        </GlowCard>

        {/* Tech stack */}
        <GlowCard className="bento-card sm:col-span-3 p-5">
          <TechStack />
        </GlowCard>

        {/* Github contributions */}
        <GlowCard className="bento-card sm:col-span-3 p-5">
          <GithubContributions username="rohitbathi" />
        </GlowCard>
      </div>
    </section>
  );
}

const projects = [
  {
    year: "2024",
    title: "Atimuss Flow",
    description:
      "Local-first personal voice agent that lives entirely on device with AES encryption. Sub-500ms speech-to-speech, 159 WPM capture — 4x faster than typing.",
    tags: ["Voice AI", "On-device", "Desktop"],
    href: "https://www.atimuss.com/",
    image: "/atimuss-flow.png",
  },
  {
    year: "2024",
    title: "ApplyLoom",
    description:
      "Job-search platform + Chrome extension scaled to 1,000+ users. Mock-interview engine with AI personas over LiveKit at sub-300ms latency.",
    tags: ["Next.js", "LiveKit", "Supabase"],
    href: "https://applyloom.atimuss.com/",
    image: "/applyloom.png",
  },
  {
    year: "2025",
    title: "CellaNova RFP Platform",
    description:
      "Citation-grounded proposal drafting with a 3-stage retrieval + refinement pipeline. 96.2% claim traceability, 97.4% generation success rate.",
    tags: ["LangGraph", "Pinecone", "FastAPI"],
    href: "https://cellanovatech-rfp.com/",
    image: "/rfp.png",
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        label="Projects"
        title={
          <>
            Milestones in the <span className="text-muted-foreground">building journey.</span>
          </>
        }
        description="Each project marks a step forward — shipping real systems that solve latency, grounding, and scale problems."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <GlowCard
            as="a"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            key={p.title}
            className="bento-card group flex flex-col p-6"
          >
            <div className="relative mb-6 h-32 w-full overflow-hidden rounded-xl border border-border bg-hero-glow">
              <iframe
                src={p.href}
                title={p.title}
                scrolling="no"
                className="absolute top-0 left-0 w-[400%] h-[400%] border-0 pointer-events-none origin-top-left scale-[0.25] opacity-85 transition-all duration-500 group-hover:scale-[0.26] group-hover:opacity-100"
                loading="lazy"
              />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {p.year}
            </div>
            <div className="mt-2 flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Disable scroll progress logic on mobile/tablet (screens < 1024px)
      if (window.innerWidth < 1024) {
        setScrollProgress(1); // Keep all cards open on mobile
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Pinning starts when parent rect.top reaches 96px (top-24)
      const startOffset = 96;
      const totalScrollableHeight = rect.height - (viewHeight - startOffset);
      if (totalScrollableHeight <= 0) return;

      const scrolled = startOffset - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} id="timeline" className="relative lg:h-[220vh] w-full">
      <div className="lg:sticky lg:top-24 mx-auto max-w-6xl px-6 py-24 lg:py-8 lg:h-[calc(100vh-8rem)] flex flex-col justify-start lg:overflow-visible">
        <SectionHeading
          label="Experience"
          title={
            <>
              Work &amp; <span className="text-muted-foreground">education.</span>
            </>
          }
          description="A Founding AI Engineer who's shipped 10+ enterprise-grade agents, taken a platform 0→1,000+ users, and obsesses over the details between demo and production."
        />
        <div className="flex-1 w-full mt-4 lg:overflow-visible">
          <Timeline scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl overflow-hidden px-6 py-32">
      <GlowCard className="bento-card relative overflow-hidden bg-hero-glow p-10 text-center sm:p-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex justify-center">
            <SectionLabel>Get in touch</SectionLabel>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let's build something <span className="text-muted-foreground">real.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have an AI product idea or an agentic workflow that needs to reach production? I'd love
            to hear about it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
            <a
              href="mailto:bathirohit@gmail.com"
              className="key-cap key-cap-hover inline-flex h-14 items-center gap-2 px-5 text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
              <span className="font-mono text-[13px] uppercase tracking-widest">
                bathirohit@gmail.com
              </span>
            </a>
            <a
              href="tel:+19414002951"
              className="key-cap key-cap-hover inline-flex h-14 items-center gap-2 px-5 text-muted-foreground hover:text-foreground"
            >
              <span className="font-mono text-[13px] uppercase tracking-widest">
                (941) 400-2951
              </span>
            </a>
          </div>
        </div>
      </GlowCard>
      {/* <footer className="mt-12 flex items-center justify-center text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Rohit Bathi. All rights reserved.</div>
      </footer> */}
    </section>
  );
}

function Portfolio() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <NavPill />
      <Hero />
      <Bento />
      <ExperienceSection />
      <Projects />
      <Contact />
    </main>
  );
}
