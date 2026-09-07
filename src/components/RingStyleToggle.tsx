import type { RingPlaceholderStyle } from "../types/bracelet";
import { SegmentedToggle } from "./SegmentedToggle";

interface RingStyleToggleProps {
  value: RingPlaceholderStyle;
  onChange: (value: RingPlaceholderStyle) => void;
  disabled?: boolean;
}

const OPTIONS: { value: RingPlaceholderStyle; label: string }[] = [
  { value: "string", label: "String" },
  { value: "circles", label: "Hollow Circles" },
];

export function RingStyleToggle({ value, onChange, disabled }: RingStyleToggleProps) {
  return (
    <SegmentedToggle
      value={value}
      options={OPTIONS}
      onChange={onChange}
      layoutId="ring-style-toggle-pill"
      disabled={disabled}
    />
  );
}
