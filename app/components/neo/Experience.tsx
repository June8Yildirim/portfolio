import { useEffect, useRef, useState, useCallback } from "react";
import { experienceData } from "~/constats/experiences";

const typeColor: Record<string, string> = {
  "Full-time": "#44ff99",
  "Contract": "#ffaa44",
  "Internship": "#88aaff",
};

// Circuit column constants (SVG coordinate space)
const CX = 60;        // center x of circuit column
const SVG_W = 120;    // SVG column width in px
const CHIP_W = 46;
const CHIP_H = 28;
const HALF = CHIP_H / 2;
const PINS = [-8, 0, 8];
const PIN_LEN = 6;
const PIN_H = 2.5;

interface CircuitData {
  d: string;
  corners: [number, number][];
}

function buildCircuit(centers: number[], totalH: number): CircuitData {
  if (!centers.length) return { d: `M ${CX} 0 L ${CX} ${totalH}`, corners: [] };

  const pts: [number, number][] = [[CX, 0]];
  const corners: [number, number][] = [];

  for (let i = 0; i < centers.length; i++) {
    const cy = centers[i];
    pts.push([CX, cy]);

    if (i < centers.length - 1) {
      const nextCy = centers[i + 1];
      const jog = i % 2 === 0 ? CX + 30 : CX - 30;
      const y1 = cy + HALF + 16;
      const y2 = nextCy - HALF - 16;

      if (y2 > y1 + 8) {
        pts.push([CX, y1], [jog, y1], [jog, y2], [CX, y2]);
        corners.push([CX, y1], [jog, y1], [jog, y2], [CX, y2]);
      }
    }
  }

  pts.push([CX, totalH]);
  return {
    d: "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L "),
    corners,
  };
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [chipCenters, setChipCenters] = useState<number[]>([]);
  const [totalH, setTotalH] = useState(900);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [signalPt, setSignalPt] = useState<{ x: number; y: number } | null>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measure card centers relative to the container
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    setTotalH(containerRef.current.offsetHeight);
    setChipCenters(
      cardRefs.current.map(el => (el ? el.offsetTop + el.offsetHeight / 2 : 0))
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 150);
    const ro = new ResizeObserver(() => setTimeout(measure, 80));
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure]);

  // Measure path length whenever the path element updates
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [chipCenters, totalH]);

  // Scroll → progress → signal bead → active chips
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || pathLen === 0) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.58 - rect.top) / rect.height));
      setProgress(p);

      const len = pathLen * Math.min(p, 0.9999);
      const pt = pathRef.current!.getPointAtLength(len);
      setSignalPt({ x: pt.x, y: pt.y });

      let cnt = 0;
      chipCenters.forEach(cy => { if (cy <= pt.y + CHIP_H) cnt++; });
      setActiveCount(cnt);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathLen, chipCenters]);

  const { d: pathD, corners } = buildCircuit(chipCenters, totalH);
  const dashOffset = pathLen > 0 ? pathLen * (1 - progress) : 0;

  // Card widths and margins
  const cardStyle = (isLeft: boolean): React.CSSProperties =>
    isMobile
      ? { marginLeft: 56, width: "calc(100% - 60px)" }
      : isLeft
      ? { marginRight: `calc(50% + ${SVG_W / 2 + 16}px)`, width: `calc(50% - ${SVG_W / 2 + 16}px)` }
      : { marginLeft: `calc(50% + ${SVG_W / 2 + 16}px)`, width: `calc(50% - ${SVG_W / 2 + 16}px)` };

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-4 md:px-12 max-w-5xl mx-auto">
      {/* SVG defs (hidden) */}
      <svg width={0} height={0} style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <filter id="glow-trace" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-bead" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-chip" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <div className="text-center mb-20">
        <p className="text-xs font-mono tracking-[0.25em] uppercase mb-3" style={{ color: "#4488ff" }}>
          Career
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
        <p className="text-xs font-mono" style={{ color: "#1e3355" }}>
          scroll to trace the circuit
        </p>
      </div>

      {/* Main container — circuit SVG overlay + cards */}
      <div ref={containerRef} className="relative">
        {/* PCB dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,80,200,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* ─── Circuit SVG ─── */}
        <svg
          className="absolute top-0 pointer-events-none"
          style={{
            left: isMobile ? 8 : "50%",
            transform: isMobile ? "none" : "translateX(-50%)",
            zIndex: 3,
            overflow: "visible",
          }}
          width={isMobile ? 48 : SVG_W}
          height={totalH}
        >
          {/* Background (dim copper) trace */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(0,55,130,0.22)"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Animated electric trace */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="rgba(0,190,255,0.95)"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeDasharray={pathLen || undefined}
            strokeDashoffset={pathLen > 0 ? dashOffset : pathLen}
            filter="url(#glow-trace)"
          />

          {/* Solder-joint pads at corners */}
          {corners.map(([cx, cy], idx) => {
            const activated = signalPt ? cy <= signalPt.y + 2 : false;
            return (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={2.8}
                fill={activated ? "rgba(0,200,255,0.9)" : "rgba(0,60,140,0.3)"}
                stroke={activated ? "rgba(0,160,255,0.5)" : "rgba(0,50,120,0.2)"}
                strokeWidth={0.5}
                filter={activated ? "url(#glow-trace)" : undefined}
              />
            );
          })}

          {/* Chip nodes */}
          {chipCenters.map((cy, i) => {
            const active = i < activeCount;
            const chipLeft = CX - CHIP_W / 2;
            const chipTop = cy - HALF;
            return (
              <g key={i}>
                {/* Outer halo when active */}
                {active && (
                  <rect
                    x={chipLeft - 5}
                    y={chipTop - 5}
                    width={CHIP_W + 10}
                    height={CHIP_H + 10}
                    rx={5}
                    fill="none"
                    stroke="rgba(0,160,255,0.18)"
                    strokeWidth={1}
                    filter="url(#glow-chip)"
                  />
                )}
                {/* Chip body */}
                <rect
                  x={chipLeft}
                  y={chipTop}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx={3}
                  fill={active ? "rgba(0,25,70,0.97)" : "rgba(4,9,24,0.9)"}
                  stroke={active ? "rgba(0,170,255,0.75)" : "rgba(0,50,120,0.3)"}
                  strokeWidth={1}
                />
                {/* IC grid pattern inside chip */}
                {active && [0, 1, 2, 3].map(col =>
                  [0, 1, 2].map(row => (
                    <rect
                      key={`${col}-${row}`}
                      x={chipLeft + 6 + col * 8}
                      y={chipTop + 5 + row * 7}
                      width={5}
                      height={4}
                      rx={0.5}
                      fill="rgba(0,120,255,0.25)"
                    />
                  ))
                )}
                {/* Pins — left */}
                {PINS.map(off => (
                  <rect
                    key={`lp${off}`}
                    x={chipLeft - PIN_LEN}
                    y={cy + off - PIN_H / 2}
                    width={PIN_LEN}
                    height={PIN_H}
                    fill={active ? "rgba(0,190,255,0.7)" : "rgba(0,60,140,0.18)"}
                  />
                ))}
                {/* Pins — right */}
                {PINS.map(off => (
                  <rect
                    key={`rp${off}`}
                    x={chipLeft + CHIP_W}
                    y={cy + off - PIN_H / 2}
                    width={PIN_LEN}
                    height={PIN_H}
                    fill={active ? "rgba(0,190,255,0.7)" : "rgba(0,60,140,0.18)"}
                  />
                ))}
                {/* Chip label */}
                <text
                  x={CX}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={active ? "6.5" : "6"}
                  fontFamily="monospace"
                  fill={active ? "rgba(100,210,255,0.95)" : "rgba(0,70,150,0.35)"}
                  letterSpacing="0.8"
                >
                  {`IC-0${i + 1}`}
                </text>
              </g>
            );
          })}

          {/* Signal bead — glowing dot at the head of the signal */}
          {signalPt && progress > 0.01 && progress < 0.99 && (
            <g filter="url(#glow-bead)">
              <circle cx={signalPt.x} cy={signalPt.y} r={6} fill="rgba(0,160,255,0.3)" />
              <circle cx={signalPt.x} cy={signalPt.y} r={3.5} fill="rgba(100,220,255,0.95)" />
              <circle cx={signalPt.x} cy={signalPt.y} r={1.5} fill="white" />
            </g>
          )}
        </svg>

        {/* ─── Experience cards ─── */}
        <div className="space-y-8 py-2">
          {experienceData.map((exp, i) => {
            const isLeft = !isMobile && i % 2 === 0;
            const active = i < activeCount;
            const isSoftware = exp.category === "software";

            return (
              <div
                key={exp.id}
                ref={el => { cardRefs.current[i] = el; }}
                style={{
                  ...cardStyle(isLeft),
                  transition: "opacity 0.55s ease, transform 0.55s ease",
                  opacity: active ? 1 : 0.18,
                  transform: active
                    ? "translateX(0)"
                    : isLeft
                    ? "translateX(-18px)"
                    : "translateX(18px)",
                }}
              >
                <div
                  className="rounded-xl p-5 relative overflow-hidden group"
                  style={{
                    background: active
                      ? "rgba(5, 12, 34, 0.92)"
                      : "rgba(5, 10, 24, 0.5)",
                    border: `1px solid ${active ? "rgba(0,130,255,0.28)" : "rgba(0,50,120,0.1)"}`,
                    backdropFilter: "blur(14px)",
                    boxShadow: active
                      ? "0 0 32px rgba(0,60,200,0.12), inset 0 1px 0 rgba(0,160,255,0.06)"
                      : "none",
                    transition: "all 0.55s ease",
                  }}
                >
                  {/* Top shimmer bar when active */}
                  {active && (
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{
                        background: "linear-gradient(to right, transparent, rgba(0,180,255,0.55), transparent)",
                      }}
                    />
                  )}

                  {/* Circuit corner decoration */}
                  {active && isSoftware && (
                    <>
                      <div
                        className="absolute top-0 right-0 w-5 h-5 pointer-events-none"
                        style={{
                          borderTop: "1px solid rgba(0,150,255,0.35)",
                          borderRight: "1px solid rgba(0,150,255,0.35)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none"
                        style={{
                          borderBottom: "1px solid rgba(0,100,255,0.2)",
                          borderLeft: "1px solid rgba(0,100,255,0.2)",
                        }}
                      />
                    </>
                  )}

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-sm leading-snug">{exp.title}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#4488ff" }}>{exp.company}</p>
                    </div>
                    <span
                      className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(0,15,50,0.7)",
                        border: `1px solid ${(typeColor[exp.type] ?? "#334466")}44`,
                        color: typeColor[exp.type] ?? "#334466",
                        boxShadow: active ? `0 0 10px ${(typeColor[exp.type] ?? "#334466")}20` : "none",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-3 text-xs font-mono" style={{ color: "#243650" }}>
                    <span>{exp.period}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Tech tags */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {exp.technologies.map(t => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{
                            background: "rgba(0,35,110,0.3)",
                            border: "1px solid rgba(0,80,200,0.18)",
                            color: "#4a6a96",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Responsibilities */}
                  <ul className="space-y-1.5">
                    {exp.responsibilities.slice(0, 2).map((r, ri) => (
                      <li key={ri} className="flex gap-2 text-xs" style={{ color: "#384e68" }}>
                        <span style={{ color: isSoftware ? "#1a4488" : "#1a2e44", flexShrink: 0 }}>▸</span>
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
