interface SlotCounterProps {
  slotsLeft: number;
  isFull: boolean;
}

export function SlotCounter({ slotsLeft, isFull }: SlotCounterProps) {
  const text = isFull ? "Full" : `${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} left`;

  return (
    <div className="flex justify-center">
      <span
        className={`px-3 py-1 text-xs font-medium tracking-wide ${
          isFull ? "bg-amber-100 text-amber-800" : "bg-surface text-ink-soft border border-border"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
