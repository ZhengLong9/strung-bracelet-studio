import { useRef } from "react";
import { motion } from "framer-motion";
import type { Bead, BeadDiameterMm } from "../types/bracelet";
import { getLibraryBeadSizePx } from "../lib/beadSize";
import { BeadImage } from "./BeadImage";
import { Tag } from "./Tag";
import { startBeadDrag } from "../lib/beadDrag";

interface BeadCardProps {
  bead: Bead;
  beadDiameterMm: BeadDiameterMm;
  disabled: boolean;
  onAdd: (beadId: string) => void;
}

export function BeadCard({ bead, beadDiameterMm, disabled, onAdd }: BeadCardProps) {
  const beadRef = useRef<HTMLDivElement>(null);

  return (
    <motion.button
      type="button"
      // Not the native `disabled` attribute: when the ring is full, clicking
      // can't add a bead, but dragging onto an occupied slot still replaces it.
      aria-disabled={disabled}
      onClick={() => !disabled && onAdd(bead.id)}
      whileHover={disabled ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`flex items-center gap-3 rounded-tag border border-border bg-surface p-3 text-left transition-[opacity,box-shadow,border-color] ${
        disabled
          ? "opacity-40 cursor-grab"
          : "hover:border-accent hover:shadow-md cursor-pointer"
      }`}
    >
      {/* Native drag on an inner div: Firefox won't start drags from a <button>. */}
      <div
        draggable
        onDragStart={(e) =>
          startBeadDrag(e, { source: "library", beadId: bead.id }, beadRef.current)
        }
        className="flex items-center gap-3"
      >
        <div ref={beadRef}>
          <BeadImage
            src={bead.image}
            alt={bead.name}
            tint={bead.tint}
            size={getLibraryBeadSizePx(beadDiameterMm)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-ink">{bead.name}</div>
          <Tag dotColor={bead.swatchColor}>{bead.colorLabel}</Tag>
        </div>
      </div>
    </motion.button>
  );
}
