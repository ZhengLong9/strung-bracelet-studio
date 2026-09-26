import { useState } from "react";

interface BeadImageProps {
  src: string;
  alt: string;
  /** Color multiplied over the image, so a clear crystal photo reads as colored
   * glass while keeping its cracks and highlights. */
  tint?: string;
  /** Fixed pixel size. Omit to fill the parent (w-full h-full). */
  size?: number;
}

export function BeadImage({ src, alt, tint, size }: BeadImageProps) {
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
    <div
      className={`relative rounded-full overflow-hidden ${dimClass}`}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
      {tint && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: tint,
            mixBlendMode: "multiply",
            // Mask to the image's own alpha so transparent edges stay untinted.
            maskImage: `url(${src})`,
            maskSize: "cover",
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: "cover",
          }}
        />
      )}
    </div>
  );
}
