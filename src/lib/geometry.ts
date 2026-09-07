export interface Point {
  x: number;
  y: number;
}

export function getSlotPosition(
  index: number,
  maxSlots: number,
  radius: number,
): Point {
  const angle = (index * 2 * Math.PI) / maxSlots - Math.PI / 2;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}
