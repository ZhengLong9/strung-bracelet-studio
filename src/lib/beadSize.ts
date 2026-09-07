const MIN_RING_BEAD_PX = 20;
const MAX_RING_BEAD_PX = 64;
const RING_FILL_RATIO = 0.98;

export function getRingBeadSizePx(maxSlots: number, radius: number): number {
  if (maxSlots <= 0) return MIN_RING_BEAD_PX;
  // Chord length between adjacent slot centers — the diameter at which
  // neighboring beads actually touch, unlike arc length which overstates it.
  const chord = 2 * radius * Math.sin(Math.PI / maxSlots);
  const raw = chord * RING_FILL_RATIO;
  return Math.min(MAX_RING_BEAD_PX, Math.max(MIN_RING_BEAD_PX, raw));
}

const MIN_LIBRARY_BEAD_PX = 24;
const MAX_LIBRARY_BEAD_PX = 56;

export function getLibraryBeadSizePx(mm: number): number {
  const raw = 24 + (mm - 6) * 3.2;
  return Math.min(MAX_LIBRARY_BEAD_PX, Math.max(MIN_LIBRARY_BEAD_PX, raw));
}
