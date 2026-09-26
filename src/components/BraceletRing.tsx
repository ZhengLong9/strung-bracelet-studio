import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import type {
  RingBackground,
  RingPlaceholderStyle,
  Slot,
} from "../types/bracelet";
import { BEAD_CATALOG_BY_ID } from "../data/beads";
import { getSlotPosition } from "../lib/geometry";
import { getRingBeadSizePx } from "../lib/beadSize";
import { BeadImage } from "./BeadImage";
import {
  isBeadDrag,
  readBeadDrag,
  startBeadDrag,
  type BeadDragPayload,
} from "../lib/beadDrag";

interface BraceletRingProps {
  slots: Slot[];
  maxSlots: number;
  onRemove?: (slotIndex: number) => void;
  /** Called when a bead (from the library or another slot) is dropped on a slot. */
  onDropBead?: (slotIndex: number, payload: BeadDragPayload) => void;
  background: RingBackground;
  placeholderStyle: RingPlaceholderStyle;
  /** View-only mode for saved bracelets — beads render but can't be removed. */
  readOnly?: boolean;
}

/** Exit animation for a bead leaving a slot. `instant` (passed via
 * AnimatePresence's `custom`) skips the shrink so a drag-drop swap doesn't
 * briefly show the outgoing and incoming beads overlapping in one slot. */
const beadExit = (instant: boolean) =>
  instant
    ? { scale: 0, opacity: 0, transition: { duration: 0 } }
    : { scale: 0, opacity: 0 };

/** True during the render that applies a drag-drop (see `skipAnimation`). */
const InstantDropContext = createContext(false);

/** Hides a bead the moment it starts leaving its slot because of a drop.
 * A zero-length exit alone isn't enough: framer applies it on its next frame,
 * so the outgoing and incoming beads could still paint together for a frame. */
function HideOnInstantExit({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  const instant = useContext(InstantDropContext);
  // Latch so it stays hidden after `instant` resets but before framer unmounts it.
  const hidden = useRef(false);
  if (!isPresent && instant) hidden.current = true;
  return (
    <div
      className="h-full w-full"
      style={hidden.current ? { display: "none" } : undefined}
    >
      {children}
    </div>
  );
}

const CONTAINER_SIZE = 380;
const RADIUS = 120;

export function BraceletRing({
  slots,
  maxSlots,
  onRemove,
  onDropBead,
  background,
  placeholderStyle,
  readOnly = false,
}: BraceletRingProps) {
  const beadSizePx = getRingBeadSizePx(maxSlots, RADIUS);
  const canDrop = !readOnly && Boolean(onDropBead);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  // True for the render that applies a drop, so the beads jump straight into
  // place instead of playing the click-to-add/remove pop animations.
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (!skipAnimation) return;
    const frame = requestAnimationFrame(() => setSkipAnimation(false));
    return () => cancelAnimationFrame(frame);
  }, [skipAnimation]);

  function handleDragOver(e: DragEvent<HTMLElement>, index: number) {
    if (!canDrop || !isBeadDrag(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = draggingIndex === null ? "copy" : "move";
    if (dragOverIndex !== index) setDragOverIndex(index);
  }

  function handleDragLeave(e: DragEvent<HTMLElement>, index: number) {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setDragOverIndex((current) => (current === index ? null : current));
  }

  function handleDrop(e: DragEvent<HTMLElement>, index: number) {
    setDragOverIndex(null);
    // Clear here rather than relying on the source's onDragEnd: a successful
    // drop unmounts the source bead, so React never sees its dragend and the
    // fade would stick to whatever bead lands in that slot next.
    setDraggingIndex(null);
    if (!canDrop) return;
    const payload = readBeadDrag(e);
    if (!payload) return;
    e.preventDefault();
    setSkipAnimation(true);
    onDropBead?.(index, payload);
  }

  return (
    <InstantDropContext.Provider value={skipAnimation}>
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
              const isDragOver = dragOverIndex === index;
              const emptySlotClassName =
                placeholderStyle === "string"
                  ? "cursor-default"
                  : "border border-dashed border-ink-faint cursor-default";
              return (
                <button
                  key={index}
                  type="button"
                  // Empty slots stay enabled (just inert on click) so they can
                  // still receive drops; disabled buttons swallow drag events.
                  disabled={readOnly}
                  aria-disabled={!isInteractive}
                  onClick={() => slot && !readOnly && onRemove?.(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={(e) => handleDragLeave(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`absolute rounded-full flex items-center justify-center transition-shadow ${
                    isInteractive
                      ? "cursor-grab active:cursor-grabbing"
                      : emptySlotClassName
                  } ${isDragOver ? "ring-2 ring-accent ring-offset-2 ring-offset-canvas" : ""}`}
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
                  <AnimatePresence custom={skipAnimation}>
                    {bead && slot && (
                      <motion.div
                        key={slot.placementId}
                        // Absolute so an exiting and an entering bead stack in the
                        // slot instead of splitting its width as flex siblings.
                        className="absolute inset-0"
                        custom={skipAnimation}
                        initial={
                          skipAnimation ? false : { scale: 0, opacity: 0 }
                        }
                        animate={{ scale: 1, opacity: 1 }}
                        exit="exit"
                        variants={{ exit: beadExit }}
                        whileHover={isInteractive ? { scale: 1.1 } : undefined}
                        whileTap={isInteractive ? { scale: 0.92 } : undefined}
                        transition={{
                          type: "spring",
                          stiffness: 480,
                          damping: 26,
                        }}
                      >
                        {/* Native drag lives on a plain div: Firefox won't start
                          drags from a <button>, and framer's motion.div
                          reserves onDragStart for its own gesture API. */}
                        <HideOnInstantExit>
                          <div
                            className={`h-full w-full transition-opacity ${
                              draggingIndex === index ? "opacity-30" : ""
                            }`}
                            draggable={canDrop}
                            onDragStart={(e) => {
                              startBeadDrag(
                                e,
                                { source: "slot", slotIndex: index },
                                e.currentTarget,
                              );
                              setDraggingIndex(index);
                            }}
                            onDragEnd={() => {
                              setDraggingIndex(null);
                              setDragOverIndex(null);
                            }}
                          >
                            <BeadImage
                              src={bead.image}
                              alt={bead.name}
                              tint={bead.tint}
                            />
                          </div>
                        </HideOnInstantExit>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </>
        )}
      </div>
    </InstantDropContext.Provider>
  );
}
