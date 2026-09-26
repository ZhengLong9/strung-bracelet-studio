import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  dotColor?: string;
  tone?: "neutral" | "warm";
}

export function Tag({ children, dotColor, tone = "neutral" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-tag border px-2.5 py-1 text-xs font-medium ${
        tone === "warm"
          ? "border-accent/30 bg-accent/15 text-accent-hover"
          : "border-border bg-surface text-ink-soft"
      }`}
    >
      {dotColor && (
        <span
          className="h-2 w-2 flex-none rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
