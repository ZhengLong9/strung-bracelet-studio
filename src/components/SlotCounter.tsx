import { Tag } from "./Tag";

interface SlotCounterProps {
  slotsLeft: number;
  isFull: boolean;
}

export function SlotCounter({ slotsLeft, isFull }: SlotCounterProps) {
  const text = isFull ? "Full" : `${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} left`;

  return <Tag tone={isFull ? "warm" : "neutral"}>{text}</Tag>;
}
