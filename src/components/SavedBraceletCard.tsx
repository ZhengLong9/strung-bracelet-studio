import { useState } from "react";
import { motion } from "framer-motion";
import { BraceletCanvasFrame } from "./BraceletCanvasFrame";
import { Tag } from "./Tag";
import { slotsFromSavedEntry } from "../lib/snapshot";
import type { SavedBraceletEntry } from "../types/bracelet";

interface SavedBraceletCardProps {
  entry: SavedBraceletEntry;
  onDelete: (id: string) => void;
}

export function SavedBraceletCard({ entry, onDelete }: SavedBraceletCardProps) {
  const [is3DOpen, setIs3DOpen] = useState(false);
  const slots = slotsFromSavedEntry(entry);
  const beadCount = entry.slots.length;
  const savedDate = new Date(entry.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Tag>
            {beadCount} bead{beadCount === 1 ? "" : "s"}
          </Tag>
          <Tag>{entry.wristCircumferenceMm / 10} cm wrist</Tag>
          <Tag>{entry.beadDiameterMm} mm beads</Tag>
        </div>
        <p className="text-xs text-ink-faint">Saved {savedDate}</p>
      </div>

      <BraceletCanvasFrame
        slots={slots}
        maxSlots={entry.maxSlots}
        is3DOpen={is3DOpen}
        onToggle3D={() => setIs3DOpen((v) => !v)}
      />

      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={() => onDelete(entry.id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-tag border border-border bg-surface px-4 py-1.5 text-xs font-medium text-ink-soft shadow-sm hover:border-ink hover:text-ink cursor-pointer"
        >
          Delete
        </motion.button>
      </div>
    </div>
  );
}
