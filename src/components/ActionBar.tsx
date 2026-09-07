import { motion } from "framer-motion";

interface ActionBarProps {
  hasAnyBeads: boolean;
  onSave: () => void;
}

export function ActionBar({ hasAnyBeads, onSave }: ActionBarProps) {
  return (
    <div className="flex justify-center gap-3">
      <motion.button
        type="button"
        disabled={!hasAnyBeads}
        onClick={onSave}
        whileHover={hasAnyBeads ? { scale: 1.03 } : undefined}
        whileTap={hasAnyBeads ? { scale: 0.96 } : undefined}
        className={`border border-accent bg-accent px-5 py-2 text-sm font-medium text-surface shadow-sm ${
          hasAnyBeads ? "hover:bg-accent-hover hover:border-accent-hover cursor-pointer" : "opacity-40 cursor-not-allowed"
        }`}
      >
        Save this Bracelet
      </motion.button>
    </div>
  );
}
