import { useState } from "react";

interface BeadImageProps {
  src: string;
  alt: string;
  /** Fixed pixel size. Omit to fill the parent (w-full h-full). */
  size?: number;
}

export function BeadImage({ src, alt, size }: BeadImageProps) {
  const [failed, setFailed] = useState(false);
  const dimClass = size === undefined ? "w-full h-full" : "";
  const style = size === undefined ? undefined : { width: size, height: size };

  if (failed) {
    return (
      <div
        className={`rounded-full bg-gray-300 ${dimClass}`}
        style={style}
        aria-label={alt}
      />
    );
  }

  return (
    <div className={`rounded-full overflow-hidden ${dimClass}`} style={style}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
