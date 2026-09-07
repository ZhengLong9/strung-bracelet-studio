import type { ReactNode } from "react";
import { BraceletRing } from "./BraceletRing";
import { Bracelet3DView } from "./Bracelet3DView";
import { View3DToggle } from "./View3DToggle";
import type { RingBackground, RingPlaceholderStyle, Slot } from "../types/bracelet";

interface BraceletCanvasFrameProps {
  slots: Slot[];
  maxSlots: number;
  is3DOpen: boolean;
  onToggle3D: () => void;
  background?: RingBackground;
  placeholderStyle?: RingPlaceholderStyle;
  onRemoveBead?: (slotIndex: number) => void;
  topRightExtra?: ReactNode;
  bottomLeft?: ReactNode;
}

export function BraceletCanvasFrame({
  slots,
  maxSlots,
  is3DOpen,
  onToggle3D,
  background = "clear",
  placeholderStyle = "circles",
  onRemoveBead,
  topRightExtra,
  bottomLeft,
}: BraceletCanvasFrameProps) {
  return (
    <div
      className={`relative flex w-full justify-center border border-border bg-canvas ${
        is3DOpen ? "" : "p-7"
      }`}
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
        {topRightExtra}
        <View3DToggle active={is3DOpen} onToggle={onToggle3D} />
      </div>

      {bottomLeft && <div className="absolute bottom-3 left-3 z-10">{bottomLeft}</div>}

      {is3DOpen ? (
        <Bracelet3DView slots={slots} maxSlots={maxSlots} onExit={onToggle3D} />
      ) : (
        <BraceletRing
          slots={slots}
          maxSlots={maxSlots}
          onRemove={onRemoveBead}
          readOnly={!onRemoveBead}
          background={background}
          placeholderStyle={placeholderStyle}
        />
      )}
    </div>
  );
}
