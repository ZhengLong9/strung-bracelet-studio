import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CLEAR_CONFIRM_MS = 3000;

interface ActionBarProps {
  hasAnyBeads: boolean;
  onSave: () => void;
  /** Omit to hide the Clear All button (e.g. in illustrations). */
  onClearAll?: () => void;
}

export function ActionBar({ hasAnyBeads, onSave, onClearAll }: ActionBarProps) {
  // Clearing wipes the whole design, so the first click only arms it and a
  // second click within a few seconds actually clears.
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    if (!confirmingClear) return;
    const timer = setTimeout(() => setConfirmingClear(false), CLEAR_CONFIRM_MS);
    return () => clearTimeout(timer);
  }, [confirmingClear]);

  useEffect(() => {
    if (!hasAnyBeads) setConfirmingClear(false);
  }, [hasAnyBeads]);

  function handleClear() {
    if (confirmingClear) {
      onClearAll?.();
      setConfirmingClear(false);
    } else {
      setConfirmingClear(true);
    }
  }

  return (
    <div className="flex justify-center gap-3">
      {onClearAll && (
        <motion.button
          type="button"
          disabled={!hasAnyBeads}
          onClick={handleClear}
          whileHover={hasAnyBeads ? { scale: 1.03 } : undefined}
          whileTap={hasAnyBeads ? { scale: 0.96 } : undefined}
          className={`rounded-tag border px-5 py-2 text-sm font-medium shadow-sm transition-colors ${
            confirmingClear
              ? "border-accent-hover bg-surface text-accent-hover"
              : "border-border bg-surface text-ink"
          } ${
            hasAnyBeads
              ? "hover:border-accent cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          {confirmingClear ? "Click again to clear" : "Clear All"}
        </motion.button>
      )}
      <motion.button
        type="button"
        disabled={!hasAnyBeads}
        onClick={onSave}
        whileHover={hasAnyBeads ? { scale: 1.03 } : undefined}
        whileTap={hasAnyBeads ? { scale: 0.96 } : undefined}
        className={`rounded-tag border border-accent bg-accent px-5 py-2 text-sm font-medium text-surface shadow-sm ${
          hasAnyBeads
            ? "hover:bg-accent-hover hover:border-accent-hover cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }`}
      >
        Save this Bracelet
      </motion.button>
    </div>
  );
}
