import { useEffect, useState, useRef } from "react";
import { Github } from "lucide-react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

const LEVEL_COLORS = [
  "bg-white/[0.04]",
  "bg-success/25",
  "bg-success/45",
  "bg-success/70",
  "bg-success",
];

export function GithubContributions({ username = "rohitbathi" }: { username?: string }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: ApiResponse) => setData(json))
      .catch(() => setError(true));
  }, [username]);

  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  const contribs = data?.contributions ?? [];
  const total = contribs.reduce((s, c) => s + c.count, 0);
  const lastActive = [...contribs].reverse().find((c) => c.count > 0);
  const lastDate = lastActive
    ? new Date(lastActive.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Build weeks (columns) of 7 days
  const weeks: Contribution[][] = [];
  if (contribs.length) {
    const first = new Date(contribs[0].date);
    const startDow = first.getDay(); // 0 = Sun
    let cursor = 0;
    let week: Contribution[] = new Array(startDow).fill(null);
    while (cursor < contribs.length) {
      week.push(contribs[cursor]);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      cursor++;
    }
    if (week.length) {
      while (week.length < 7) week.push(null as any);
      weeks.push(week);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground transition-colors hover:border-success/40"
        >
          <Github className="h-3.5 w-3.5" />
          Github activity
        </a>
        <span className="text-xs text-muted-foreground">
          {data ? `${total} contributions in the last year` : error ? "Unavailable" : "Loading…"}
        </span>
      </div>

      <div className="flex-1 overflow-x-auto pb-1" ref={scrollRef}>
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((day, j) =>
                day ? (
                  <div
                    key={j}
                    title={`${day.date}: ${day.count}`}
                    className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_COLORS[day.level]}`}
                  />
                ) : (
                  <div key={j} className="h-[10px] w-[10px] rounded-[2px]" />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {lastDate && (
        <div className="mt-4 text-xs text-muted-foreground">
          Last pushed on {lastDate}
        </div>
      )}
    </div>
  );
}
