import { useEffect, useState } from "react";
import type { BeadDiameterMm, Slot } from "../types/bracelet";
import {
  DEFAULT_BEAD_DIAMETER_MM,
  DEFAULT_WRIST_CIRCUMFERENCE_MM,
  MAX_WRIST_CIRCUMFERENCE_MM,
  MIN_WRIST_CIRCUMFERENCE_MM,
} from "../data/beads";

function computeMaxSlots(wristCircumferenceMm: number, beadDiameterMm: number) {
  return Math.max(0, Math.floor(wristCircumferenceMm / beadDiameterMm));
}

export function useBraceletDesigner() {
  const [beadDiameterMm, setBeadDiameterMm] = useState<BeadDiameterMm>(
    DEFAULT_BEAD_DIAMETER_MM,
  );
  const [wristCircumferenceMm, setWristCircumferenceMmState] = useState(
    DEFAULT_WRIST_CIRCUMFERENCE_MM,
  );
  const [slots, setSlots] = useState<Slot[]>(() =>
    Array(computeMaxSlots(DEFAULT_WRIST_CIRCUMFERENCE_MM, DEFAULT_BEAD_DIAMETER_MM)).fill(
      null,
    ),
  );
  const [lastDroppedCount, setLastDroppedCount] = useState(0);

  const maxSlots = computeMaxSlots(wristCircumferenceMm, beadDiameterMm);

  useEffect(() => {
    setSlots((prev) => {
      if (maxSlots >= prev.length) {
        return [...prev, ...Array(maxSlots - prev.length).fill(null)];
      }
      const dropped = prev.slice(maxSlots).filter(Boolean).length;
      if (dropped > 0) setLastDroppedCount(dropped);
      return prev.slice(0, maxSlots);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSlots]);

  function setWristCircumferenceMm(value: number) {
    const clamped = Math.min(
      MAX_WRIST_CIRCUMFERENCE_MM,
      Math.max(MIN_WRIST_CIRCUMFERENCE_MM, value),
    );
    setWristCircumferenceMmState(Number.isFinite(clamped) ? clamped : DEFAULT_WRIST_CIRCUMFERENCE_MM);
  }

  function addBead(beadId: string) {
    setSlots((prev) => {
      const idx = prev.findIndex((slot) => slot === null);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { placementId: crypto.randomUUID(), beadId };
      return next;
    });
  }

  function removeBead(slotIndex: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }

  function clearDroppedNotice() {
    setLastDroppedCount(0);
  }

  const filledCount = slots.filter(Boolean).length;
  const slotsLeft = maxSlots - filledCount;
  const isFull = slotsLeft <= 0;
  const hasAnyBeads = filledCount > 0;

  return {
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
  };
}
