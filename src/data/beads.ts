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
    swatchColor: "#e4e6e8",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    colorLabel: "NAVY",
    swatchColor: "#35507a",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    tint: "#5f82b8",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    colorLabel: "RUST",
    swatchColor: "#c1502e",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    tint: "#dc7650",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "sage-green",
    name: "Sage Green",
    colorLabel: "SAGE",
    swatchColor: "#6b7a4a",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    tint: "#9aae6c",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "blush-pink",
    name: "Blush Pink",
    colorLabel: "BLUSH",
    swatchColor: "#c98a90",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    tint: "#eaa4ad",
    model: "/models/crackle-quartz-bead.glb",
  },
  {
    id: "amber-gold",
    name: "Amber Gold",
    colorLabel: "AMBER",
    swatchColor: "#b8791f",
    priceModifier: 0.5,
    image: "/beads/crystal.png",
    tint: "#e3a03a",
    model: "/models/crackle-quartz-bead.glb",
  },
];

export const BEAD_CATALOG_BY_ID: Record<string, Bead> = Object.fromEntries(
  BEAD_CATALOG.map((bead) => [bead.id, bead]),
);
