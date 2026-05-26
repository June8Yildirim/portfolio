import { useEffect, useRef, useState } from "react";

const roles = [
  "FullStack Developer",
  "iOS Developer",
  "React Native Engineer",
  "Spring Boot Architect",
];

const stats = [
  { value: "8+", label: "Projects" },
  { value: "3+", label: "Years Exp" },
  { value: "2", label: "App Stores" },
  { value: "5", label: "Companies" },
];

export default function Hero({
  onProjectsClick,
}: {
  onProjectsClick: () => void;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          60,
        );
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          35,
        );
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 md:px-12"
    >
      {/* Subtle center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,80,255,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="h-px w-12 flex-shrink-0"
            style={{
              background: "linear-gradient(to right, transparent, #4488ff)",
            }}
          />
          <span
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "#4488ff" }}
          >
            Software Developer
          </span>
          <div
            className="h-px w-12 flex-shrink-0"
            style={{
              background: "linear-gradient(to left, transparent, #4488ff)",
            }}
          />
        </div>

        {/* Name */}
        <h1
          className="font-bold text-white mb-4 leading-none"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Cuneyt{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4488ff 0%, #00ccff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Yildirim
          </span>
        </h1>

        {/* Typewriter role */}
        <div className="flex items-center justify-center gap-2 mb-8 h-10">
          <span
            className="text-xl md:text-2xl font-light"
            style={{ color: "#8899bb" }}
          >
            {displayed}
          </span>
          <span
            className="w-0.5 h-6 rounded-full animate-pulse"
            style={{ background: "#4488ff" }}
          />
        </div>

        {/* Bio */}
        <p
          className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-12"
          style={{ color: "#556688" }}
        >
          Building high-performance mobile and web applications with AI
          integrations, real-time systems, and native iOS experiences. From the
          App Store to enterprise backends.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button
            onClick={onProjectsClick}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #0055dd, #0088ff)",
              color: "white",
              boxShadow: "0 0 30px rgba(0, 100, 255, 0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 50px rgba(0, 120, 255, 0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(0, 100, 255, 0.35)";
            }}
          >
            <span>✦</span> Explore Projects
          </button>
          <button
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
            style={{
              background: "transparent",
              border: "1px solid rgba(0, 100, 255, 0.35)",
              color: "#88aaff",
            }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in touch →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 py-4 rounded-xl"
              style={{
                background: "rgba(0, 20, 60, 0.4)",
                border: "1px solid rgba(0, 80, 200, 0.18)",
              }}
            >
              <span
                className="text-2xl font-bold text-white"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </span>
              <span className="text-xs font-mono" style={{ color: "#334466" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Summary card ── */}
        <div
          className="max-w-2xl mx-auto rounded-2xl p-6 text-left relative overflow-hidden"
          style={{
            background: "rgba(4, 10, 26, 0.75)",
            border: "1px solid rgba(0, 80, 200, 0.2)",
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 0 40px rgba(0,50,200,0.07), inset 0 1px 0 rgba(0,150,255,0.06)",
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,150,255,0.4), transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left — bio */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#44ff99",
                    boxShadow: "0 0 6px #44ff9988",
                  }}
                />
                <span
                  className="text-xs font-mono tracking-[0.2em] uppercase"
                  style={{ color: "#44ff99" }}
                >
                  Available for work
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#4a6080" }}
              >
                Montreal-based software developer specialising in native iOS
                apps, cross-platform React Native, and full-stack web systems.
                I've shipped production apps to the App Store and Google Play,
                architected Spring Boot backends, and built 6-application
                ecosystems from scratch over 5 years.
              </p>
              <div
                className="flex items-center gap-1.5 text-xs font-mono"
                style={{ color: "#243650" }}
              >
                <span>📍</span>
                <span>Montreal, QC — open to remote</span>
              </div>
            </div>

            {/* Right — core domains */}
            <div className="flex flex-col gap-2 md:w-44 shrink-0">
              <p
                className="text-xs font-mono tracking-widest uppercase mb-1"
                style={{ color: "#1e3355" }}
              >
                Core domains
              </p>
              {[
                { label: "iOS / SwiftUI", color: "#4488ff" },
                { label: "React Native", color: "#6644ff" },
                { label: "Next.js / GSAP", color: "#0099ff" },
                { label: "Spring Boot / MySql", color: "#44bbff" },
                { label: ".Net / PostgreSql", color: "#0066ff" },
                { label: "C++ ", color: "#0066ff" },
                { label: "Docker ", color: "#0066ff" },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{
                    background: `${color}0d`,
                    border: `1px solid ${color}28`,
                    color: `${color}cc`,
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: color, opacity: 0.7 }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs font-mono" style={{ color: "#223355" }}>
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, #4488ff44, transparent)",
          }}
        />
      </div>
    </section>
  );
}
