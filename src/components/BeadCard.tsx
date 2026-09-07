import { motion } from "framer-motion";
import type { Bead, BeadDiameterMm } from "../types/bracelet";
import { getLibraryBeadSizePx } from "../lib/beadSize";
import { BeadImage } from "./BeadImage";

interface BeadCardProps {
  bead: Bead;
  beadDiameterMm: BeadDiameterMm;
  disabled: boolean;
  onAdd: (beadId: string) => void;
}

export function BeadCard({ bead, beadDiameterMm, disabled, onAdd }: BeadCardProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onAdd(bead.id)}
      whileHover={disabled ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`flex items-center gap-3 border border-border bg-surface p-3 text-left shadow-sm transition-[opacity,box-shadow,border-color] ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:border-accent hover:shadow-md cursor-pointer"
      }`}
    >
      <BeadImage
        src={bead.image}
        alt={bead.name}
        size={getLibraryBeadSizePx(beadDiameterMm)}
      />
      <div>
        <div className="text-sm font-medium text-ink">{bead.name}</div>
        <div className="text-xs tracking-wide text-ink-faint">
          {bead.colorLabel}
        </div>
      </div>
    </motion.button>
  );
}
