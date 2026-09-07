export type Page = "design" | "how-it-works" | "saved";

export type BeadDiameterMm = 6 | 8 | 10 | 12 | 14 | 16;

export type RingBackground = "clear" | "wooden-tray";

export type RingPlaceholderStyle = "circles" | "string";

export interface Bead {
  id: string;
  name: string;
  colorLabel: string;
  priceModifier: number;
  /** Flat photo used for the 2D ring and library thumbnail. */
  image: string;
  /** GLB model used for the 3D viewer. */
  model: string;
}

export interface PlacedBead {
  placementId: string;
  beadId: string;
}

export type Slot = PlacedBead | null;

export interface SavedBraceletEntry {
  id: string;
  createdAt: string;
  beadDiameterMm: BeadDiameterMm;
  wristCircumferenceMm: number;
  maxSlots: number;
  slots: { slotIndex: number; beadId: string }[];
  totalPrice: number;
}
