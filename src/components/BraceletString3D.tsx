interface BraceletString3DProps {
  radius: number;
  centerY: number;
}

const TUBE_RADIUS = 0.02;

/**
 * A thin cord running the full circumference of the ring, standing in for
 * open slots. THREE's TorusGeometry already lies flat in the XY plane
 * (its hole axis is Z), matching how the bracelet ring itself is laid out,
 * so no extra rotation is needed here.
 */
export function BraceletString3D({ radius, centerY }: BraceletString3DProps) {
  return (
    <mesh position={[0, centerY, 0]}>
      <torusGeometry args={[radius, TUBE_RADIUS, 16, 64]} />
      <meshStandardMaterial color="#c3b8a3" roughness={0.7} />
    </mesh>
  );
}
