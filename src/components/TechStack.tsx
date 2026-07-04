import { Layers } from "lucide-react";

const ICONS: { slug: string; name: string }[] = [
  { slug: "python", name: "Python" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "fastapi", name: "FastAPI" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "pytorch", name: "PyTorch" },
  { slug: "tensorflow", name: "TensorFlow" },
  { slug: "langchain", name: "LangChain" },
  { slug: "openai", name: "OpenAI" },
  { slug: "graphql", name: "GraphQL" },
  { slug: "redis", name: "Redis" },
  { slug: "docker", name: "Docker" },
  { slug: "kubernetes", name: "Kubernetes" },
  { slug: "amazonaws", name: "AWS" },
  { slug: "googlecloud", name: "GCP" },
  { slug: "tailwindcss", name: "Tailwind" },
  { slug: "vercel", name: "Vercel" },
];

export function TechStack() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground">
          <Layers className="h-3.5 w-3.5" />
          Tech stack
        </div>

        <div className="text-lg font-semibold text-foreground">Tech stacks I'm familiar with</div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-xl">
          Primarily focused on the AI + full-stack ecosystem, but always eager to explore and adopt
          what best solves the problem.
        </p>
      </div>

      <div className="relative mt-8 w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-4 animate-marquee py-2 whitespace-nowrap hover:[animation-play-state:paused]">
          {/* We repeat the array twice to ensure seamless scrolling */}
          {[...ICONS, ...ICONS].map((icon, idx) => (
            <div
              key={`${icon.slug}-${idx}`}
              title={icon.name}
              className="flex shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-secondary/20 px-4 py-3 transition-all hover:border-success/40 hover:bg-secondary/40"
            >
              <img
                src={`https://cdn.simpleicons.org/${icon.slug}/white`}
                alt={icon.name}
                className="h-5 w-5 opacity-80"
                loading="lazy"
              />
              <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
