import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SavedBraceletCard } from "../components/SavedBraceletCard";
import { deleteSavedBracelet, getSavedBracelets } from "../lib/storage";
import type { SavedBraceletEntry } from "../types/bracelet";

export function SavedBraceletsPage() {
  const [entries, setEntries] = useState<SavedBraceletEntry[]>(() =>
    getSavedBracelets(),
  );

  function handleDelete(id: string) {
    deleteSavedBracelet(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
          Saved Bracelets
        </h2>
        <p className="mt-1 text-xs text-ink-faint">
          Bracelets you've saved from the design page.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="py-12 text-center text-sm text-ink-soft">
          You haven't saved any bracelets yet. Head to the design page to make one.
        </p>
      ) : (
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border pt-8 first:border-t-0 first:pt-0"
            >
              <SavedBraceletCard entry={entry} onDelete={handleDelete} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
