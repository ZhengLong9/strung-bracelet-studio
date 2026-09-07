import { motion } from "framer-motion";

interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedToggleProps<T extends string> {
  value: T;
  options: SegmentedToggleOption<T>[];
  onChange: (value: T) => void;
  layoutId: string;
  disabled?: boolean;
}

export function SegmentedToggle<T extends string>({
  value,
  options,
  onChange,
  layoutId,
  disabled,
}: SegmentedToggleProps<T>) {
  return (
    <div
      className={`inline-flex gap-1 border border-border bg-surface p-1 shadow-sm ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={`relative whitespace-nowrap px-3 py-1 text-xs transition-colors ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            } ${isActive ? "text-surface" : "text-ink-soft hover:text-ink"}`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 bg-accent"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
