import { useState } from "react";
import type { ReactNode } from "react";
import { BeadCard } from "../components/BeadCard";
import { BraceletRing } from "../components/BraceletRing";
import { BraceletCanvasFrame } from "../components/BraceletCanvasFrame";
import { SizeSelector } from "../components/SizeSelector";
import { ActionBar } from "../components/ActionBar";
import { BEAD_CATALOG } from "../data/beads";
import type { BeadDiameterMm, Slot } from "../types/bracelet";

const DEMO_MAX_SLOTS = 12;
const DEMO_SLOTS: Slot[] = Array.from({ length: DEMO_MAX_SLOTS }, (_, i) => {
  const beadIds = ["ocean-blue", "terracotta", "crystal-white", "sage-green", "amber-gold"];
  return i < beadIds.length
    ? { placementId: `demo-${i}`, beadId: beadIds[i] }
    : null;
});

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
  illustration: ReactNode;
}

function Step({ number, title, children, illustration }: StepProps) {
  return (
    <li className="flex flex-col gap-4 border-t border-border pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-medium text-surface">
          {number}
        </span>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-ink">
            {title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">{children}</p>
        </div>
      </div>
      <div className="bead-mat ml-9 flex justify-center rounded-tray border border-border bg-canvas p-6">
        {illustration}
      </div>
    </li>
  );
}

export function HowItWorksPage() {
  const [demoBeadMm, setDemoBeadMm] = useState<BeadDiameterMm>(10);
  const [demoWristMm, setDemoWristMm] = useState(165);
  const [demo3DOpen, setDemo3DOpen] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
          How it Works
        </h2>
        <p className="mt-1 text-xs text-ink-faint">
          Five steps from bead to bracelet.
        </p>
      </div>

      <ol className="flex flex-col gap-8">
        <Step
          number={1}
          title="Pick a bead"
          illustration={
            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              {BEAD_CATALOG.slice(0, 2).map((bead) => (
                <BeadCard
                  key={bead.id}
                  bead={bead}
                  beadDiameterMm={10}
                  disabled={false}
                  onAdd={() => {}}
                />
              ))}
            </div>
          }
        >
          Browse the Bead Library at the bottom of the design page and click any
          bead to add it to your ring.
        </Step>

        <Step
          number={2}
          title="Fill your ring"
          illustration={
            <div className="scale-[0.55] origin-center -my-20">
              <BraceletRing
                slots={DEMO_SLOTS}
                maxSlots={DEMO_MAX_SLOTS}
                background="clear"
                placeholderStyle="circles"
                readOnly
              />
            </div>
          }
        >
          Keep adding beads until the ring is full, or click a bead you've
          already placed to remove it.
        </Step>

        <Step
          number={3}
          title="Set your size"
          illustration={
            <SizeSelector
              beadDiameterMm={demoBeadMm}
              onChangeBeadDiameterMm={setDemoBeadMm}
              wristCircumferenceMm={demoWristMm}
              onChangeWristCircumferenceMm={setDemoWristMm}
            />
          }
        >
          Enter your wrist size in centimeters and choose a bead diameter —
          the ring resizes to fit exactly, and beads that no longer fit are
          dropped automatically.
        </Step>

        <Step
          number={4}
          title="Preview in 3D"
          illustration={
            <div className="w-full max-w-sm">
              <BraceletCanvasFrame
                slots={DEMO_SLOTS}
                maxSlots={DEMO_MAX_SLOTS}
                is3DOpen={demo3DOpen}
                onToggle3D={() => setDemo3DOpen((v) => !v)}
              />
            </div>
          }
        >
          Flip the 3D View switch to see your bracelet rendered in three
          dimensions. Drag to rotate it and scroll to zoom.
        </Step>

        <Step
          number={5}
          title="Save it"
          illustration={<ActionBar hasAnyBeads onSave={() => {}} />}
        >
          Click &ldquo;Save this Bracelet&rdquo; to keep it in your Saved
          Bracelets, where you can revisit or delete it later.
        </Step>
      </ol>
    </div>
  );
}
