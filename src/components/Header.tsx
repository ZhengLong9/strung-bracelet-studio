import type { Page } from "../types/bracelet";

interface HeaderProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: "design", label: "Design" },
  { page: "how-it-works", label: "How it works" },
  { page: "saved", label: "Saved Bracelets" },
];

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink">
          Bracelet Studio
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Design your own bead bracelet, sized just for you.
        </p>
      </div>
      <nav className="flex gap-6 pb-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.page === page;
          return (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`relative cursor-pointer pb-1.5 text-xs font-medium transition-colors ${
                isActive ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
