import type { RingBackground } from "../types/bracelet";
import { SegmentedToggle } from "./SegmentedToggle";

interface BackgroundToggleProps {
  value: RingBackground;
  onChange: (value: RingBackground) => void;
  disabled?: boolean;
}

const OPTIONS: { value: RingBackground; label: string }[] = [
  { value: "wooden-tray", label: "Wooden Tray" },
  { value: "clear", label: "Clear Background" },
];

export function BackgroundToggle({ value, onChange, disabled }: BackgroundToggleProps) {
  return (
    <SegmentedToggle
      value={value}
      options={OPTIONS}
      onChange={onChange}
      layoutId="background-toggle-pill"
      disabled={disabled}
    />
  );
}
