import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Grid, Lightformer, OrbitControls } from "@react-three/drei";
import type { Slot } from "../types/bracelet";
import { BEAD_CATALOG_BY_ID } from "../data/beads";
import {
  FIXED_BEAD_RADIUS_3D,
  getRingCenterY,
  getRingRadius3D,
  getSlotAngle,
  getSlotPosition3D,
} from "../lib/geometry3d";
import { BeadMesh } from "./BeadMesh";
import { BraceletString3D } from "./BraceletString3D";

interface BraceletScene3DProps {
  slots: Slot[];
  maxSlots: number;
  onRemove: (slotIndex: number) => void;
}

// Matches the 2D ring frame's total height (380px ring + 28px padding on
// each side) so switching between 2D/3D never resizes the card. Width fills
// the full card instead of a centered square, so the dark viewport reaches
// edge to edge rather than floating inside a wider white card.
const VIEWPORT_HEIGHT = 436;

const CAMERA_FOV_DEG = 45;

export function BraceletScene3D({
  slots,
  maxSlots,
  onRemove,
}: BraceletScene3DProps) {
  const ringRadius = getRingRadius3D(maxSlots);
  const centerY = getRingCenterY(ringRadius);

  // The camera must never get so close that the ring's top/bottom beads fall
  // outside the vertical field of view and get cropped by the canvas edge.
  // A 10% margin keeps a small buffer beyond the exact fit.
  const requiredHalfHeight = (ringRadius + FIXED_BEAD_RADIUS_3D) * 1.1;
  const minCameraDistance =
    requiredHalfHeight / Math.tan((CAMERA_FOV_DEG / 2) * (Math.PI / 180));
  const maxCameraDistance = minCameraDistance * 2;
  const defaultCameraDistance = minCameraDistance * 1.08;

  return (
    <div className="relative w-full" style={{ height: VIEWPORT_HEIGHT }}>
      <Canvas
        camera={{
          position: [0, centerY + 0.3, defaultCameraDistance],
          fov: CAMERA_FOV_DEG,
          near: 0.05,
          far: 100,
        }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        {/* Neutral 3D-modeling-viewport look: flat grey backdrop + a floor grid. */}
        <color attach="background" args={["#4b4b4d"]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, centerY + 2.5, 4]} intensity={1.8} />

        <Grid
          args={[20, 20]}
          cellSize={0.25}
          cellThickness={0.5}
          cellColor="#6b6b6e"
          sectionSize={1.25}
          sectionThickness={1}
          sectionColor="#8c8c90"
          fadeDistance={14}
          fadeStrength={1}
          infiniteGrid
        />

        <Suspense fallback={null}>
          {/* Procedural, self-contained environment (no external HDR fetch), with
              bright/dark contrast bands so the glass material's reflections
              show visible highlights instead of blending into a flat pale
              sphere against the page's own pale background. */}
          <Environment resolution={256} background={false}>
            <Lightformer
              form="rect"
              intensity={4}
              color="white"
              position={[0, 6, 0]}
              scale={[8, 8, 1]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="white"
              position={[0, -6, 0]}
              scale={[8, 8, 1]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={0.6}
              color="#111111"
              position={[-6, centerY, 0]}
              scale={[1, 10, 10]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <Lightformer
              form="rect"
              intensity={0.6}
              color="#111111"
              position={[6, centerY, 0]}
              scale={[1, 10, 10]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <Lightformer
              form="rect"
              intensity={3}
              color="white"
              position={[0, centerY, 6]}
              scale={[6, 6, 1]}
            />
          </Environment>
        </Suspense>

        {maxSlots > 0 && <BraceletString3D radius={ringRadius} centerY={centerY} />}

        <Suspense fallback={null}>
          {maxSlots > 0 &&
            slots.map((slot, index) => {
              if (!slot) return null;
              const position = getSlotPosition3D(index, maxSlots, ringRadius, centerY);
              const bead = BEAD_CATALOG_BY_ID[slot.beadId];
              return (
                <BeadMesh
                  key={slot.placementId}
                  bead={bead}
                  position={position}
                  radius={FIXED_BEAD_RADIUS_3D}
                  rotationZ={getSlotAngle(index, maxSlots)}
                  onRemove={() => onRemove(index)}
                />
              );
            })}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          target={[0, centerY, 0]}
          minDistance={minCameraDistance}
          maxDistance={maxCameraDistance}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI * 0.85}
          rotateSpeed={0.9}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
