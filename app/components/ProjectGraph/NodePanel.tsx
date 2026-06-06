import React, { useState, useEffect } from "react";
import type { GraphNode } from "./graphUtils";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PanelState = 1 | 2 | 3; // 1=overview  2=gallery  3=components

interface Props {
  node: GraphNode;
  onClose: () => void;
}

const stateLabels: Record<PanelState, string> = {
  1: "Overview",
  2: "Gallery",
  3: "Components",
};

export default function NodePanel({ node, onClose }: Props) {
  const [state, setState] = useState<PanelState>(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    setState(1);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [node.id]);

  const next = () => setState((s) => Math.min(s + 1, 3) as PanelState);
  const prev = () => setState((s) => Math.max(s - 1, 1) as PanelState);
  const hasImages = node.images && node.images.length > 0;
  const hasFeatures =
    node.detail?.key_features && node.detail.key_features.length > 0;

  return (
    <div
      className="fixed right-0 top-0 h-full z-40 flex items-center pointer-events-none"
      style={{ width: "clamp(320px, 38vw, 520px)" }}
    >
      <div
        className="pointer-events-auto w-full h-full flex flex-col"
        style={{
          background: "rgba(5, 8, 28, 0.92)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(0, 100, 255, 0.3)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "-8px 0 60px rgba(0, 80, 255, 0.15)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-5 pb-3"
          style={{ borderBottom: "1px solid rgba(0, 100, 255, 0.2)" }}
        >
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-mono tracking-widest mb-1"
              style={{ color: "#4488ff" }}
            >
              {node.company || "Personal Project"}
            </p>
            <h2 className="text-xl font-bold text-white truncate">
              {node.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-3 mt-0.5 text-gray-500 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* State tabs */}
        <div
          className="flex px-5 pt-3 gap-1"
          style={{ borderBottom: "1px solid rgba(0,100,255,0.12)" }}
        >
          {([1, 2, 3] as PanelState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className="pb-2 px-3 text-xs font-mono tracking-wider transition-all"
              style={{
                color: state === s ? "#4488ff" : "#445566",
                borderBottom:
                  state === s ? "2px solid #4488ff" : "2px solid transparent",
              }}
            >
              {stateLabels[s]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {/* STATE 1 — Overview */}
          {state === 1 && (
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {node.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md text-xs font-mono font-semibold"
                    style={{
                      background: "rgba(0, 68, 204, 0.2)",
                      border: "1px solid rgba(0, 100, 255, 0.35)",
                      color: "#88aaff",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Summary */}
              {node.detail?.summary && (
                <div>
                  <p
                    className="text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#4488ff" }}
                  >
                    SUMMARY
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {node.detail.summary}
                  </p>
                </div>
              )}

              {/* Mission */}
              {node.detail?.core_purpose?.mission && (
                <div>
                  <p
                    className="text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#4488ff" }}
                  >
                    MISSION
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {node.detail.core_purpose.mission}
                  </p>
                </div>
              )}

              {/* Achievements */}
              <div>
                <p
                  className="text-xs font-mono tracking-widest mb-2"
                  style={{ color: "#4488ff" }}
                >
                  KEY ACHIEVEMENTS
                </p>
                <ul className="space-y-2">
                  {node.achievements.slice(0, 4).map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span style={{ color: "#4488ff", flexShrink: 0 }}>▸</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Platforms */}
              {node.detail?.app_identity?.platforms && (
                <div>
                  <p
                    className="text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#4488ff" }}
                  >
                    PLATFORMS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {node.detail.app_identity.platforms.map((p, idx) =>
                      p.link ? (
                        <a
                          key={idx}
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 rounded text-xs transition-colors hover:bg-blue-900/40"
                          style={{
                            background: "rgba(0,30,80,0.6)",
                            color: "#aabbff",
                            border: "1px solid rgba(100,150,255,0.2)",
                          }}
                        >
                          {p.name}
                        </a>
                      ) : (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            background: "rgba(0,30,80,0.6)",
                            color: "#aabbff",
                            border: "1px solid rgba(100,150,255,0.2)",
                          }}
                        >
                          {p.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              {node.detail?.app_identity?.url && (
                <a
                  href={node.detail.app_identity.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 80, 255, 0.3), rgba(0, 40, 150, 0.2))",
                    border: "1px solid rgba(0, 100, 255, 0.5)",
                    color: "#aaccff",
                    boxShadow: "0 0 15px rgba(0, 80, 255, 0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0, 100, 255, 0.4), rgba(0, 60, 200, 0.3))";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(0, 80, 255, 0.25)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0, 80, 255, 0.3), rgba(0, 40, 150, 0.2))";
                    e.currentTarget.style.boxShadow =
                      "0 0 15px rgba(0, 80, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span className="text-sm">↗</span> View Live
                </a>
              )}
            </div>
          )}

          {/* STATE 2 — Gallery */}
          {state === 2 && (
            <div>
              {hasImages ? (
                <div className="space-y-4">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={12}
                    slidesPerView={1}
                    className="rounded-xl overflow-hidden"
                    style={
                      {
                        "--swiper-navigation-color": "#4488ff",
                        "--swiper-pagination-color": "#4488ff",
                      } as React.CSSProperties
                    }
                  >
                    {node.images!.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="flex items-center justify-center h-[480px]">
                          <img
                            src={img}
                            alt={`${node.title} screenshot ${i + 1}`}
                            className="max-h-full max-w-full object-contain"
                            style={{ borderRadius: 12 }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <p
                    className="text-xs font-mono text-center"
                    style={{ color: "#334466" }}
                  >
                    {node.images!.length} screenshots
                  </p>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-48 rounded-xl"
                  style={{
                    border: "1px dashed rgba(0,100,255,0.2)",
                    color: "#334466",
                  }}
                >
                  <span className="text-3xl mb-2">🖼</span>
                  <p className="text-xs font-mono">No screenshots available</p>
                </div>
              )}
            </div>
          )}

          {/* STATE 3 — Components */}
          {state === 3 && (
            <div className="space-y-3">
              {hasFeatures ? (
                node.detail!.key_features.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(0, 20, 60, 0.5)",
                      border: "1px solid rgba(0, 80, 200, 0.2)",
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span
                        className="text-xs font-mono font-bold mt-0.5"
                        style={{ color: "#4488ff" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white leading-tight">
                          {feature.title}
                        </p>
                        {feature.automation_level && (
                          <span
                            className="text-xs font-mono"
                            style={{
                              color:
                                feature.automation_level === "High"
                                  ? "#44ffaa"
                                  : feature.automation_level === "Medium"
                                    ? "#ffaa44"
                                    : "#aaaaff",
                            }}
                          >
                            {feature.automation_level} complexity
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-6">
                      {feature.description}
                    </p>
                    {feature.technology && (
                      <p
                        className="text-xs font-mono mt-2 pl-6"
                        style={{ color: "#335577" }}
                      >
                        {feature.technology}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div>
                  <p
                    className="text-xs font-mono tracking-widest mb-3"
                    style={{ color: "#4488ff" }}
                  >
                    PROBLEM SOLVED
                  </p>
                  {node.detail?.core_purpose?.problem_solved?.map((p, i) => (
                    <div
                      key={i}
                      className="flex gap-2 text-sm text-gray-300 py-2"
                      style={{ borderBottom: "1px solid rgba(0,50,150,0.15)" }}
                    >
                      <span style={{ color: "#4488ff" }}>◆</span>
                      <span>
                        {typeof p === "string" ? p : (p as any).title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderTop: "1px solid rgba(0,100,255,0.15)" }}
        >
          <button
            onClick={prev}
            disabled={state === 1}
            className="px-4 py-1.5 text-xs font-mono rounded-lg transition-all disabled:opacity-25"
            style={{
              border: "1px solid rgba(0,100,255,0.3)",
              color: "#4488ff",
            }}
          >
            ← Back
          </button>
          <div className="flex gap-1.5">
            {([1, 2, 3] as PanelState[]).map((s) => (
              <div
                key={s}
                className="rounded-full transition-all"
                style={{
                  width: state === s ? 20 : 6,
                  height: 6,
                  background: state === s ? "#4488ff" : "rgba(0,100,255,0.25)",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={state === 3}
            className="px-4 py-1.5 text-xs font-mono rounded-lg transition-all disabled:opacity-25"
            style={{
              border: "1px solid rgba(0,100,255,0.3)",
              color: "#4488ff",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
