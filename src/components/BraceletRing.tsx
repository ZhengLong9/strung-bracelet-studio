import { AnimatePresence, motion } from "framer-motion";
import type { RingBackground, RingPlaceholderStyle, Slot } from "../types/bracelet";
import { BEAD_CATALOG_BY_ID } from "../data/beads";
import { getSlotPosition } from "../lib/geometry";
import { getRingBeadSizePx } from "../lib/beadSize";
import { BeadImage } from "./BeadImage";

interface BraceletRingProps {
  slots: Slot[];
  maxSlots: number;
  onRemove?: (slotIndex: number) => void;
  background: RingBackground;
  placeholderStyle: RingPlaceholderStyle;
  /** View-only mode for saved bracelets — beads render but can't be removed. */
  readOnly?: boolean;
}

const CONTAINER_SIZE = 380;
const RADIUS = 120;

export function BraceletRing({
  slots,
  maxSlots,
  onRemove,
  background,
  placeholderStyle,
  readOnly = false,
}: BraceletRingProps) {
  const beadSizePx = getRingBeadSizePx(maxSlots, RADIUS);

  return (
    <div
      className="relative mx-auto"
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
    >
      {background === "wooden-tray" && (
        <img
          src="/backgrounds/wooden-tray.png"
          alt="Wooden tray"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}

      {placeholderStyle === "string" && maxSlots > 0 && (
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: RADIUS * 2,
            height: RADIUS * 2,
            transform: "translate(-50%, -50%)",
            border: "1.5px solid var(--color-ink-faint)",
          }}
        />
      )}

      {maxSlots === 0 ? null : (
        <>
          {slots.map((slot, index) => {
            const { x, y } = getSlotPosition(index, maxSlots, RADIUS);
            const bead = slot ? BEAD_CATALOG_BY_ID[slot.beadId] : null;
            const isInteractive = Boolean(slot) && !readOnly;
            const emptySlotClassName =
              placeholderStyle === "string"
                ? "cursor-default"
                : "border border-dashed border-ink-faint cursor-default";
            return (
              <button
                key={index}
                type="button"
                disabled={!isInteractive}
                onClick={() => slot && onRemove?.(index)}
                className={`absolute rounded-full flex items-center justify-center ${
                  isInteractive ? "cursor-pointer" : emptySlotClassName
                }`}
                style={{
                  left: "50%",
                  top: "50%",
                  width: beadSizePx,
                  height: beadSizePx,
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                aria-label={
                  bead
                    ? readOnly
                      ? bead.name
                      : `Remove ${bead.name} from bracelet`
                    : "Empty slot"
                }
              >
                <AnimatePresence>
                  {bead && slot && (
                    <motion.div
                      key={slot.placementId}
                      className="h-full w-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={isInteractive ? { scale: 1.1 } : undefined}
                      whileTap={isInteractive ? { scale: 0.92 } : undefined}
                      transition={{ type: "spring", stiffness: 480, damping: 26 }}
                    >
                      <BeadImage src={bead.image} alt={bead.name} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}
