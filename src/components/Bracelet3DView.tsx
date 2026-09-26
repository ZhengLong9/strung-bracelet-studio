import { useEffect, useRef, useState } from "react";
import type { Slot } from "../types/bracelet";
import { BraceletScene3D } from "./BraceletScene3D";

interface Bracelet3DViewProps {
  slots: Slot[];
  maxSlots: number;
  onExit: () => void;
}

const REMOVE_ERROR_DURATION_MS = 2200;

export function Bracelet3DView({ slots, maxSlots, onExit }: Bracelet3DViewProps) {
  const [removeErrorVisible, setRemoveErrorVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onExit();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  function handleAttemptRemove() {
    // While one error is showing, ignore further attempts rather than
    // stacking a second one — the current message always fully disappears
    // before any new one can appear.
    if (removeErrorVisible) return;
    setRemoveErrorVisible(true);
    hideTimerRef.current = window.setTimeout(() => {
      setRemoveErrorVisible(false);
    }, REMOVE_ERROR_DURATION_MS);
  }

  return (
    <div className="relative w-full">
      <BraceletScene3D
        slots={slots}
        maxSlots={maxSlots}
        onRemove={handleAttemptRemove}
      />

      {removeErrorVisible && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
          <div className="animate-shake rounded-tag border border-accent/30 bg-surface px-4 py-2 text-sm text-accent-hover shadow-lg">
            Removing beads isn't available in the 3D preview
          </div>
        </div>
      )}
    </div>
  );
}
