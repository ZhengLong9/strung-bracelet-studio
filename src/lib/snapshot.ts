import type { SavedBraceletEntry, Slot } from "../types/bracelet";

export function slotsFromSavedEntry(entry: SavedBraceletEntry): Slot[] {
  const slots: Slot[] = new Array(entry.maxSlots).fill(null);
  for (const { slotIndex, beadId } of entry.slots) {
    if (slotIndex >= 0 && slotIndex < slots.length) {
      slots[slotIndex] = { placementId: `${entry.id}:${slotIndex}`, beadId };
    }
  }
  return slots;
}
