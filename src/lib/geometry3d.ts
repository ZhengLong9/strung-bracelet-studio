export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Fixed visual size for every 3D bead, independent of the 2D mm selector.
 * The 3D viewer is only meant to preview overall bracelet look (not exact
 * physical sizing), so it always renders at the model's own natural scale —
 * changing the selected bead mm outside never affects it.
 */
export const FIXED_BEAD_RADIUS_3D = 0.22;

/**
 * The model's glass-like shell fades out toward its silhouette (soft
 * Fresnel edge from the transmission material), so its visible opaque
 * surface reads as smaller than its true geometric bounding sphere —
 * spacing beads at exact tangency leaves a visible gap. Packing centers
 * closer than a full radius-sum apart (a factor < 1) makes the bounding
 * spheres overlap slightly, so the *visible* surfaces read as touching,
 * like beads actually strung on a bracelet.
 */
const BEAD_PACKING_FACTOR = 0.72;

const MIN_RING_RADIUS_3D = FIXED_BEAD_RADIUS_3D * 2;

/**
 * Ring radius derived FROM the fixed bead size and slot count — the inverse
 * of the old approach (which derived bead size from a fixed ring radius).
 */
export function getRingRadius3D(maxSlots: number): number {
  const packedRadius = FIXED_BEAD_RADIUS_3D * BEAD_PACKING_FACTOR;
  if (maxSlots < 3) return MIN_RING_RADIUS_3D;
  return packedRadius / Math.sin(Math.PI / maxSlots);
}

/** The ring sits centered at y = ringRadius, so its bottom edge rests at y = 0. */
export function getRingCenterY(ringRadius: number): number {
  return ringRadius;
}

export function getSlotAngle(index: number, maxSlots: number): number {
  return Math.PI / 2 - (index * 2 * Math.PI) / maxSlots;
}

export function getSlotPosition3D(
  index: number,
  maxSlots: number,
  ringRadius: number,
  centerY: number,
): Vec3 {
  const angle = getSlotAngle(index, maxSlots);
  return {
    x: ringRadius * Math.cos(angle),
    y: ringRadius * Math.sin(angle) + centerY,
    z: 0,
  };
}
