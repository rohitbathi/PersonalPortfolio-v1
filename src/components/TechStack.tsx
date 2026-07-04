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
    <div className="flex h-full flex-col">
      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground">
        <Layers className="h-3.5 w-3.5" />
        Tech stack
      </div>

      <div className="grid flex-1 grid-cols-6 gap-3 sm:gap-4">
        {ICONS.map((icon) => (
          <div
            key={icon.slug}
            title={icon.name}
            className="flex aspect-square items-center justify-center rounded-lg border border-border/60 bg-secondary/20 p-2 transition-all hover:border-success/40 hover:bg-secondary/40"
          >
            <img
              src={`https://cdn.simpleicons.org/${icon.slug}/white`}
              alt={icon.name}
              className="h-6 w-6 opacity-80"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="text-sm font-semibold text-foreground">
          Tech stacks I'm familiar with
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Primarily focused on the AI + full-stack ecosystem, but always eager to
          explore and adopt what best solves the problem.
        </p>
      </div>
    </div>
  );
}
