import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBraceletDesigner } from "../hooks/useBraceletDesigner";
import { BraceletCanvasFrame } from "../components/BraceletCanvasFrame";
import { BackgroundToggle } from "../components/BackgroundToggle";
import { RingStyleToggle } from "../components/RingStyleToggle";
import { SizeSelector } from "../components/SizeSelector";
import { SlotCounter } from "../components/SlotCounter";
import { BeadLibrary } from "../components/BeadLibrary";
import { ActionBar } from "../components/ActionBar";
import { BEAD_CATALOG_BY_ID } from "../data/beads";
import { saveBracelet } from "../lib/storage";
import type {
  RingBackground,
  RingPlaceholderStyle,
  SavedBraceletEntry,
} from "../types/bracelet";

const SAVE_CONFIRMATION_MS = 2200;

export function DesignPage() {
  const {
    beadDiameterMm,
    setBeadDiameterMm,
    wristCircumferenceMm,
    setWristCircumferenceMm,
    slots,
    maxSlots,
    slotsLeft,
    isFull,
    hasAnyBeads,
    addBead,
    removeBead,
    lastDroppedCount,
    clearDroppedNotice,
  } = useBraceletDesigner();

  const [ringBackground, setRingBackground] = useState<RingBackground>("clear");
  const [placeholderStyle, setPlaceholderStyle] =
    useState<RingPlaceholderStyle>("circles");
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (lastDroppedCount === 0) return;
    const timer = setTimeout(clearDroppedNotice, 3000);
    return () => clearTimeout(timer);
  }, [lastDroppedCount, clearDroppedNotice]);

  useEffect(() => {
    if (!justSaved) return;
    const timer = setTimeout(() => setJustSaved(false), SAVE_CONFIRMATION_MS);
    return () => clearTimeout(timer);
  }, [justSaved]);

  function buildSnapshot(): SavedBraceletEntry {
    const filled = slots
      .map((slot, index) =>
        slot ? { slotIndex: index, beadId: slot.beadId } : null,
      )
      .filter((s): s is { slotIndex: number; beadId: string } => s !== null);
    const totalPrice = filled.reduce(
      (sum, s) => sum + (BEAD_CATALOG_BY_ID[s.beadId]?.priceModifier ?? 0),
      0,
    );
    return {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      beadDiameterMm,
      wristCircumferenceMm,
      maxSlots,
      slots: filled,
      totalPrice,
    };
  }

  function handleSave() {
    saveBracelet(buildSnapshot());
    setJustSaved(true);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <BraceletCanvasFrame
        slots={slots}
        maxSlots={maxSlots}
        is3DOpen={is3DOpen}
        onToggle3D={() => setIs3DOpen((v) => !v)}
        background={ringBackground}
        placeholderStyle={placeholderStyle}
        onRemoveBead={removeBead}
        topRightExtra={
          <>
            <BackgroundToggle
              value={ringBackground}
              onChange={setRingBackground}
              disabled={is3DOpen}
            />
            <RingStyleToggle
              value={placeholderStyle}
              onChange={setPlaceholderStyle}
              disabled={is3DOpen}
            />
          </>
        }
        bottomLeft={<SlotCounter slotsLeft={slotsLeft} isFull={isFull} />}
      />

      <div className="flex min-h-4 items-center justify-center">
        <AnimatePresence>
          {lastDroppedCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-center text-xs text-amber-700"
            >
              {lastDroppedCount} bead{lastDroppedCount > 1 ? "s" : ""} removed
              &mdash; new size only fits {maxSlots}.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <SizeSelector
          beadDiameterMm={beadDiameterMm}
          onChangeBeadDiameterMm={setBeadDiameterMm}
          wristCircumferenceMm={wristCircumferenceMm}
          onChangeWristCircumferenceMm={setWristCircumferenceMm}
        />

        <div className="hidden h-6 w-px bg-border sm:block" />

        <ActionBar hasAnyBeads={hasAnyBeads} onSave={handleSave} />
      </div>

      <div className="flex min-h-4 items-center justify-center">
        <AnimatePresence>
          {justSaved && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-center text-xs text-accent"
            >
              Saved to your Saved Bracelets.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="h-px w-full bg-border" />

      <BeadLibrary
        beadDiameterMm={beadDiameterMm}
        isFull={isFull}
        onAdd={addBead}
      />
    </div>
  );
}
