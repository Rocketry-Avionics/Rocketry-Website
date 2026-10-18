interface MinimapProps {
  xNorm: number;
  altitude: number;
  apogee: number;
}

const W = 56;
const H = 150;

export default function Minimap({ xNorm, altitude, apogee }: MinimapProps) {
  const maxAlt = Math.max(40, apogee * 1.15, altitude * 1.2);
  const altFrac = Math.min(1, Math.max(0, altitude / maxAlt));
  const apoFrac = Math.min(1, Math.max(0, apogee / maxAlt));
  const xFrac = Math.min(1, Math.max(0, (xNorm + 1) / 2));

  const padX = W / 2;
  const floorY = H - 10;
  const rocketX = 8 + xFrac * (W - 16);
  const rocketY = floorY - altFrac * (H - 28);
  const apogeeY = floorY - apoFrac * (H - 28);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="rounded-lg border border-line bg-ink/70 backdrop-blur"
      aria-label="Flight minimap showing rocket position relative to the landing pad"
    >
      <line
        x1={padX}
        y1={floorY}
        x2={rocketX}
        y2={rocketY}
        stroke="#45413d"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {apogee > 5 && (
        <line
          x1={8}
          y1={apogeeY}
          x2={W - 8}
          y2={apogeeY}
          stroke="#f0a840"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      )}
      <polygon
        points={`${padX - 5},${floorY} ${padX + 5},${floorY} ${padX},${floorY - 7}`}
        fill="#e05252"
      />
      <line x1={6} y1={floorY} x2={W - 6} y2={floorY} stroke="#45413d" strokeWidth="1.5" />
      <circle cx={rocketX} cy={rocketY} r="3.5" fill="#f4f1ec" />
    </svg>
  );
}
