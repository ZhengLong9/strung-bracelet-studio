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

  /** Put a library bead into a specific slot, replacing whatever was there. */
  function placeBead(beadId: string, slotIndex: number) {
    setSlots((prev) => {
      if (slotIndex < 0 || slotIndex >= prev.length) return prev;
      const next = [...prev];
      next[slotIndex] = { placementId: crypto.randomUUID(), beadId };
      return next;
    });
  }

  /** Move a placed bead to another slot, swapping with any bead already there. */
  function moveBead(fromIndex: number, toIndex: number) {
    setSlots((prev) => {
      if (fromIndex === toIndex || !prev[fromIndex] || toIndex >= prev.length) return prev;
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }

  function clearAll() {
    setSlots((prev) => prev.map(() => null));
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
    placeBead,
    moveBead,
    clearAll,
    lastDroppedCount,
    clearDroppedNotice,
  };
}
