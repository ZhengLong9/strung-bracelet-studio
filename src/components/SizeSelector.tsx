import { useEffect, useRef, useState } from "react";
import { BEAD_SIZES_MM } from "../data/beads";
import type { BeadDiameterMm } from "../types/bracelet";

const WRIST_INPUT_DEBOUNCE_MS = 400;

function mmToCm(mm: number): string {
  return String(Math.round((mm / 10) * 10) / 10);
}

interface SizeSelectorProps {
  beadDiameterMm: BeadDiameterMm;
  onChangeBeadDiameterMm: (mm: BeadDiameterMm) => void;
  wristCircumferenceMm: number;
  onChangeWristCircumferenceMm: (mm: number) => void;
}

export function SizeSelector({
  beadDiameterMm,
  onChangeBeadDiameterMm,
  wristCircumferenceMm,
  onChangeWristCircumferenceMm,
}: SizeSelectorProps) {
  const [wristInputCm, setWristInputCm] = useState(mmToCm(wristCircumferenceMm));
  const onChangeWristCircumferenceMmRef = useRef(onChangeWristCircumferenceMm);
  onChangeWristCircumferenceMmRef.current = onChangeWristCircumferenceMm;

  useEffect(() => {
    setWristInputCm(mmToCm(wristCircumferenceMm));
  }, [wristCircumferenceMm]);

  useEffect(() => {
    const parsedCm = Number(wristInputCm);
    if (wristInputCm.trim() === "" || !Number.isFinite(parsedCm)) return;
    const timer = setTimeout(() => {
      onChangeWristCircumferenceMmRef.current(parsedCm * 10);
    }, WRIST_INPUT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [wristInputCm]);

  function commitWristInputNow() {
    const parsedCm = Number(wristInputCm);
    if (wristInputCm.trim() !== "" && Number.isFinite(parsedCm)) {
      onChangeWristCircumferenceMm(parsedCm * 10);
    } else {
      setWristInputCm(mmToCm(wristCircumferenceMm));
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <label className="sr-only" htmlFor="wrist-size-cm">
        Wrist size (cm)
      </label>
      <input
        id="wrist-size-cm"
        type="text"
        inputMode="decimal"
        value={wristInputCm}
        onChange={(e) => setWristInputCm(e.target.value)}
        onBlur={commitWristInputNow}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commitWristInputNow();
            e.currentTarget.blur();
          }
        }}
        title="Wrist size (cm)"
        className="w-16 rounded-tag border border-border bg-surface px-2 py-1.5 text-center text-sm outline-none transition-colors focus:border-accent"
      />
      <div
        className="flex gap-1.5"
        role="group"
        aria-label="Bead size in millimeters"
      >
        {BEAD_SIZES_MM.map((mm) => (
          <button
            key={mm}
            type="button"
            onClick={() => onChangeBeadDiameterMm(mm)}
            className={`cursor-pointer rounded-tag border px-3 py-1.5 text-sm transition-colors ${
              mm === beadDiameterMm
                ? "border-accent bg-accent text-surface"
                : "border-border bg-surface text-ink-soft hover:border-ink"
            }`}
          >
            {mm} mm
          </button>
        ))}
      </div>
    </div>
  );
}
