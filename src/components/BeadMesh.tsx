import { useMemo, useRef } from "react";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, MeshPhysicalMaterial, Sphere } from "three";
import type { Bead } from "../types/bracelet";
import type { Vec3 } from "../lib/geometry3d";

const HIGH_TRANSMISSION_THRESHOLD = 0.85;
const MAX_VISIBLE_TRANSMISSION = 0.75;
const BOOSTED_ENV_MAP_INTENSITY = 3;

const CLICK_DRAG_THRESHOLD_PX = 6;

interface BeadMeshProps {
  bead: Bead;
  position: Vec3;
  radius: number;
  /** Rotation (radians) around Z so the model's drill-hole axis (its local Y)
   * aligns with the string's tangent direction at this point on the ring,
   * instead of every bead pointing the same fixed way regardless of position. */
  rotationZ: number;
  onRemove: () => void;
}

export function BeadMesh({
  bead,
  position,
  radius,
  rotationZ,
  onRemove,
}: BeadMeshProps) {
  const { gl } = useThree();
  const dragDistance = useRef(0);
  const { scene } = useGLTF(bead.model);

  // The model's own size/origin are arbitrary, so on each clone we measure its
  // bounding sphere and scale + recenter it to exactly fill the given slot
  // radius, centered on the mesh's local origin (so `position` placement below
  // lines up with the ring's slot math).
  const model = useMemo(() => {
    const clone = scene.clone(true);
    // A material that's almost fully transmissive (real glass/quartz) reads
    // as nearly invisible unless the surrounding environment is very rich —
    // ours isn't, so cap transmission and boost env reflections just enough
    // that the outer shell still shows a visible surface/silhouette instead
    // of disappearing and leaving only the internal shards visible.
    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const material = child.material;
      if (
        material instanceof MeshPhysicalMaterial &&
        material.transmission >= HIGH_TRANSMISSION_THRESHOLD
      ) {
        material.transmission = MAX_VISIBLE_TRANSMISSION;
        material.envMapIntensity = BOOSTED_ENV_MAP_INTENSITY;
      }
    });
    const box = new Box3().setFromObject(clone);
    const sphere = box.getBoundingSphere(new Sphere());
    const scaleFactor = sphere.radius > 0 ? radius / sphere.radius : 1;
    clone.scale.setScalar(scaleFactor);
    clone.position.set(
      -sphere.center.x * scaleFactor,
      -sphere.center.y * scaleFactor,
      -sphere.center.z * scaleFactor,
    );
    return clone;
  }, [scene, radius]);

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    dragDistance.current = 0;
    e.stopPropagation();
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (e.buttons) {
      dragDistance.current +=
        Math.abs(e.movementX ?? 0) + Math.abs(e.movementY ?? 0);
    }
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    if (dragDistance.current < CLICK_DRAG_THRESHOLD_PX) {
      onRemove();
    }
  }

  function handlePointerOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    gl.domElement.style.cursor = "pointer";
  }

  function handlePointerOut() {
    gl.domElement.style.cursor = "default";
  }

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[0, 0, rotationZ]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/models/crackle-quartz-bead.glb");
