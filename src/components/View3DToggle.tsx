import { motion } from "framer-motion";

interface View3DToggleProps {
  active: boolean;
  onToggle: () => void;
}

const TRACK_WIDTH = 34;
const TRACK_HEIGHT = 18;
const TRACK_BORDER_WIDTH = 1;
const THUMB_SIZE = 14;
const THUMB_INSET = 2;

// Positions are relative to the track's padding box (inside its border), so
// the resting/active offsets must subtract the border on both sides or the
// thumb creeps past the track's right edge when active.
const TRACK_INNER_WIDTH = TRACK_WIDTH - TRACK_BORDER_WIDTH * 2;
const THUMB_X_OFF = THUMB_INSET;
const THUMB_X_ON = TRACK_INNER_WIDTH - THUMB_SIZE - THUMB_INSET;

export function View3DToggle({ active, onToggle }: View3DToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 border border-border bg-surface px-2.5 py-1.5 shadow-sm">
      <span className="text-xs text-ink-soft">3D View</span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label="Toggle 3D view"
        onClick={onToggle}
        className="relative shrink-0 cursor-pointer appearance-none border transition-colors"
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderWidth: TRACK_BORDER_WIDTH,
          borderColor: active ? "var(--color-accent)" : "var(--color-border)",
          backgroundColor: active ? "var(--color-accent)" : "var(--color-bg)",
        }}
      >
        <motion.span
          className="absolute"
          style={{
            left: 0,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            top: (TRACK_HEIGHT - TRACK_BORDER_WIDTH * 2 - THUMB_SIZE) / 2,
            backgroundColor: "var(--color-surface)",
          }}
          animate={{ x: active ? THUMB_X_ON : THUMB_X_OFF }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </button>
    </div>
  );
}
