interface Trace {
  d: string;
  delay: string;
}

const traces: Trace[] = [
  { d: "M160 95 H100 V60 H84", delay: "0s" },
  { d: "M160 130 H100 V160 H84", delay: "1s" },
  { d: "M240 95 H300 V55 H316", delay: "2s" },
  { d: "M240 130 H300 V175 H316", delay: "3s" },
];

function Part({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={64}
        height={44}
        rx={4}
        fill="#14261c"
        stroke="#2e7d54"
        strokeWidth={1.5}
      />
      <text
        x={x + 32}
        y={y + 26}
        textAnchor="middle"
        fill="#9fd6b8"
        fontSize="9"
        fontFamily="monospace"
      >
        {label}
      </text>
    </g>
  );
}

export default function PcbPanel() {
  return (
    <div className="relative h-full w-full bg-[#0c1a12]">
      <svg
        viewBox="0 0 400 225"
        className="h-full w-full"
        role="img"
        aria-label="Animated PCB trace diagram of the v0 flight computer"
      >
        <g stroke="#173323" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 28} x2="400" y2={i * 28} />
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="225" />
          ))}
        </g>

        {traces.map((trace) => (
          <path
            key={`base-${trace.d}`}
            d={trace.d}
            fill="none"
            stroke="#2e7d54"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}

        {traces.map((trace) => (
          <path
            key={`pulse-${trace.d}`}
            d={trace.d}
            fill="none"
            stroke="#f0a840"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="10 182"
            className="animate-trace"
            style={{ animationDelay: trace.delay }}
          />
        ))}

        {traces.map((trace) => {
          const points = trace.d.match(/-?\d+/g);
          if (!points) return null;
          const nums = points.map(Number);
          const x = nums[2];
          const y = nums[3];
          return (
            <circle
              key={`via-${trace.d}`}
              cx={x}
              cy={y}
              r="3"
              fill="#f0a840"
              opacity="0.7"
            />
          );
        })}

        <Part x={20} y={38} label="MPU6050" />
        <Part x={20} y={138} label="BMP280" />
        <Part x={316} y={38} label="REG" />
        <Part x={316} y={138} label="SD" />

        <rect
          x={160}
          y={85}
          width={80}
          height={56}
          rx={5}
          fill="#151515"
          stroke="#3a3734"
          strokeWidth={1.5}
        />
        <text
          x={200}
          y={110}
          textAnchor="middle"
          fill="#f4f1ec"
          fontSize="11"
          fontFamily="monospace"
        >
          TEENSY
        </text>
        <text
          x={200}
          y={126}
          textAnchor="middle"
          fill="#f4f1ec"
          fontSize="11"
          fontFamily="monospace"
        >
          4.1
        </text>

        <text x={14} y={214} fill="#2e7d54" fontSize="8" fontFamily="monospace">
          v0 FLIGHT COMPUTER
        </text>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, #ffffff 2px 3px)",
        }}
      />
    </div>
  );
}
