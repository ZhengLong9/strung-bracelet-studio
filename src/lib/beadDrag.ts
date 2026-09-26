import type { DragEvent } from "react";

/** Custom MIME type so ring slots only accept drags that came from this app. */
const BEAD_DRAG_TYPE = "application/x-bracelet-bead";

export type BeadDragPayload =
  | { source: "library"; beadId: string }
  | { source: "slot"; slotIndex: number };

export function startBeadDrag(
  e: DragEvent<HTMLElement>,
  payload: BeadDragPayload,
  dragImage?: Element | null,
) {
  e.dataTransfer.setData(BEAD_DRAG_TYPE, JSON.stringify(payload));
  e.dataTransfer.effectAllowed = payload.source === "library" ? "copy" : "move";
  if (dragImage) {
    const rect = dragImage.getBoundingClientRect();
    e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);
  }
}

export function isBeadDrag(e: DragEvent<HTMLElement>) {
  return e.dataTransfer.types.includes(BEAD_DRAG_TYPE);
}

export function readBeadDrag(e: DragEvent<HTMLElement>): BeadDragPayload | null {
  try {
    return JSON.parse(e.dataTransfer.getData(BEAD_DRAG_TYPE)) as BeadDragPayload;
  } catch {
    return null;
  }
}
