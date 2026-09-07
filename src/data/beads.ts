import type { Bead, BeadDiameterMm } from "../types/bracelet";

export const BEAD_SIZES_MM: BeadDiameterMm[] = [6, 8, 10, 12, 14, 16];

export const DEFAULT_BEAD_DIAMETER_MM: BeadDiameterMm = 10;
export const DEFAULT_WRIST_CIRCUMFERENCE_MM = 165;

export const MIN_WRIST_CIRCUMFERENCE_MM = 140;
export const MAX_WRIST_CIRCUMFERENCE_MM = 300;

export const BEAD_CATALOG: Bead[] = [
  {
    id: "crystal-white",
    name: "Crystal Clear",
    colorLabel: "CLEAR",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    colorLabel: "NAVY",
    priceModifier: 0.5,
    image: "/beads/ocean.svg",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    colorLabel: "RUST",
    priceModifier: 0.5,
    image: "/beads/terracotta.svg",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "sage-green",
    name: "Sage Green",
    colorLabel: "SAGE",
    priceModifier: 0.5,
    image: "/beads/sage.svg",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "blush-pink",
    name: "Blush Pink",
    colorLabel: "BLUSH",
    priceModifier: 0.5,
    image: "/beads/blush.svg",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "amber-gold",
    name: "Amber Gold",
    colorLabel: "AMBER",
    priceModifier: 0.5,
    image: "/beads/amber.svg",
    model: "/models/crackle-quartz-bead.glb",
  },
];

export const BEAD_CATALOG_BY_ID: Record<string, Bead> = Object.fromEntries(
  BEAD_CATALOG.map((bead) => [bead.id, bead]),
);
