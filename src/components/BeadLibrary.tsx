import { BEAD_CATALOG } from "../data/beads";
import type { BeadDiameterMm } from "../types/bracelet";
import { BeadCard } from "./BeadCard";

interface BeadLibraryProps {
  beadDiameterMm: BeadDiameterMm;
  isFull: boolean;
  onAdd: (beadId: string) => void;
}

export function BeadLibrary({ beadDiameterMm, isFull, onAdd }: BeadLibraryProps) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
        Bead Library
      </h2>
      <p className="mb-4 text-xs text-ink-faint">
        Click a bead to add it to your bracelet
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {BEAD_CATALOG.map((bead) => (
          <BeadCard
            key={bead.id}
            bead={bead}
            beadDiameterMm={beadDiameterMm}
            disabled={isFull}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}
