interface Token {
  t: string;
  c: string;
}

const codeLines: Token[][] = [
  [{ t: "// v0 flight software: sensor data collection loop", c: "text-muted" }],
  [{ t: "#include", c: "text-flame" }, { t: " <Wire.h>", c: "text-sky" }],
  [{ t: "#include", c: "text-flame" }, { t: " <SD.h>", c: "text-sky" }],
  [],
  [
    { t: "MPU6050", c: "text-amber" },
    { t: " mpu;  ", c: "text-paper" },
    { t: "// accel + gyro", c: "text-muted" },
  ],
  [
    { t: "BMP280", c: "text-amber" },
    { t: " bmp;  ", c: "text-paper" },
    { t: "// barometric altitude", c: "text-muted" },
  ],
  [],
  [{ t: "void", c: "text-flame" }, { t: " loop() {", c: "text-paper" }],
  [
    { t: "  float", c: "text-flame" },
    { t: " ax, ay, az = ", c: "text-paper" },
    { t: "mpu", c: "text-sky" },
    { t: ".readAccel();", c: "text-paper" },
  ],
  [
    { t: "  float", c: "text-flame" },
    { t: " gx, gy, gz = ", c: "text-paper" },
    { t: "mpu", c: "text-sky" },
    { t: ".readGyro();", c: "text-paper" },
  ],
  [
    { t: "  float", c: "text-flame" },
    { t: " alt = ", c: "text-paper" },
    { t: "bmp", c: "text-sky" },
    { t: ".readAltitude();", c: "text-paper" },
  ],
  [],
  [
    { t: "  ", c: "text-paper" },
    { t: "logToSD", c: "text-amber" },
    { t: "(ax, ay, az, gx, gy, gz, alt);", c: "text-paper" },
  ],
  [{ t: "}", c: "text-paper" }],
];

export default function CodeTerminal() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0b0c0e] font-mono">
      <div className="flex items-center gap-2 border-b border-line/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-flame/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-sky/70" />
        <span className="ml-2 text-[10px] text-muted">flight_computer_v0.ino</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-flame">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-flame" />
          REC
        </span>
      </div>

      <pre className="flex-1 overflow-hidden p-4 text-[10px] leading-relaxed sm:text-xs">
        {codeLines.map((line, i) => (
          <div
            key={i}
            className="animate-line whitespace-pre"
            style={{ animationDelay: `${i * 0.14}s` }}
          >
            {line.length === 0
              ? " "
              : line.map((token, j) => (
                  <span key={j} className={token.c}>
                    {token.t}
                  </span>
                ))}
            {i === codeLines.length - 1 && (
              <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-flame align-middle" />
            )}
          </div>
        ))}
      </pre>

      <div className="border-t border-line/50 px-3 py-1.5 text-[10px] text-muted">
        representative of the v0 data collection logic
      </div>

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
