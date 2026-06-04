"use client";
import { useState } from "react";
import domainData from "~/constats/domainRepos.json";

type Repo = { name: string; language: string | null };

type Domain = {
  id: number;
  index: string;
  label: string;
  title: string;
  accent: string;
  repos: Repo[];
};

const DOMAINS: Domain[] = domainData.domains as Domain[];

const LANG_COLORS: Record<string, string> = {
  "C++": "#f34b7d",
  Swift: "#fa7343",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Kotlin: "#a97bff",
  "C#": "#178600",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00add8",
};

const SUMMARY =
  "Full-stack engineer with 5+ years building and shipping production systems across iOS, web, and mobile. Worked across 3 companies shipping 15+ applications — from native SwiftUI apps on the App Store to Spring Boot backends, React Native platforms, and Next.js portals. Each domain below reflects repositories from my GitHub.";

export default function Education() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeDomain = DOMAINS.find((d) => d.id === activeId) ?? null;

  return (
    <section
      id="education"
      className="relative overflow-hidden"
      style={{ background: "#050510", minHeight: "100vh" }}
    >
      {/* PCB dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,80,200,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Header */}
      <div className="pt-16 pb-4 text-center relative z-10">
        <p
          className="text-xs font-mono tracking-[0.25em] uppercase mb-2"
          style={{ color: "#4488ff" }}
        >
          Background
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Core GitHub Repos Domains
        </h2>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 px-6 md:px-14 pt-8 pb-16 max-w-7xl mx-auto">
        {/* ── Left: content panel ── */}
        <div className="flex-1 min-h-[520px]">
          {!activeDomain ? (
            <SummaryPanel />
          ) : (
            <ReposPanel domain={activeDomain} />
          )}
        </div>

        {/* ── Right: domain buttons ── */}
        <div className="md:w-64 shrink-0 flex flex-col gap-2">
          {DOMAINS.map((domain) => {
            const isActive = domain.id === activeId;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveId(isActive ? null : domain.id)}
                className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: isActive
                    ? `${domain.accent}14`
                    : "rgba(4,10,26,0.7)",
                  border: `1px solid ${isActive ? domain.accent + "55" : "rgba(0,50,130,0.2)"}`,
                  boxShadow: isActive
                    ? `0 0 20px ${domain.accent}18, inset 0 1px 0 ${domain.accent}18`
                    : "none",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono shrink-0"
                    style={{
                      color: isActive ? domain.accent : "rgba(0,70,160,0.35)",
                    }}
                  >
                    {domain.index}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span
                      className="block text-[10px] font-mono tracking-[0.12em] uppercase mb-0.5"
                      style={{
                        color: isActive
                          ? `${domain.accent}bb`
                          : "rgba(0,70,160,0.38)",
                      }}
                    >
                      {domain.label}
                    </span>
                    <span
                      className="block font-semibold text-sm leading-tight"
                      style={{
                        color: isActive ? "#fff" : "rgba(80,120,200,0.55)",
                      }}
                    >
                      {domain.title}
                    </span>
                  </div>

                  {/* Repo count badge */}
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      background: isActive
                        ? `${domain.accent}20`
                        : "rgba(0,50,130,0.15)",
                      color: isActive ? domain.accent : "rgba(0,70,160,0.35)",
                      border: `1px solid ${isActive ? domain.accent + "30" : "rgba(0,50,130,0.15)"}`,
                    }}
                  >
                    {domain.repos.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryPanel() {
  const totalRepos = DOMAINS.reduce((acc, d) => acc + d.repos.length, 0);
  return (
    <div
      className="h-full rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between"
      style={{
        background: "rgba(4,10,26,0.9)",
        border: "1px solid rgba(0,80,200,0.2)",
        backdropFilter: "blur(16px)",
        minHeight: 520,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #4488ff55, transparent)",
        }}
      />
      <div
        className="absolute top-4 right-4 w-5 h-5"
        style={{
          borderTop: "1px solid rgba(0,80,200,0.3)",
          borderRight: "1px solid rgba(0,80,200,0.3)",
        }}
      />
      <div
        className="absolute bottom-4 left-4 w-5 h-5"
        style={{
          borderBottom: "1px solid rgba(0,80,200,0.15)",
          borderLeft: "1px solid rgba(0,80,200,0.15)",
        }}
      />
      <span
        className="absolute bottom-6 right-8 font-mono font-bold select-none pointer-events-none"
        style={{
          fontSize: 96,
          lineHeight: 1,
          color: "rgba(0,80,200,0.04)",
          letterSpacing: "-0.05em",
        }}
      >
        DEV
      </span>

      <div>
        <p
          className="text-xs font-mono tracking-[0.22em] uppercase mb-5"
          style={{ color: "#4488ff" }}
        >
          Select a domain →
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-white mb-2"
          style={{ lineHeight: 1.15 }}
        >
          Full-Stack Engineer
        </h3>
        <p className="text-base mb-6" style={{ color: "#4488ff" }}>
          across 7 core domains
        </p>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "#3a5270", maxWidth: 560 }}
        >
          {SUMMARY}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-8">
        {[
          { label: "Repos Tracked", value: `${totalRepos}+` },
          { label: "Companies", value: "3" },
          { label: "Core Domains", value: "7" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center"
            style={{
              background: "rgba(0,70,180,0.08)",
              border: "1px solid rgba(0,80,200,0.15)",
            }}
          >
            <span className="block text-2xl font-bold text-white">
              {stat.value}
            </span>
            <span
              className="block text-xs font-mono mt-1"
              style={{ color: "rgba(0,100,200,0.55)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReposPanel({ domain }: { domain: Domain }) {
  return (
    <div
      className="h-full rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col"
      style={{
        background: "rgba(4,10,26,0.9)",
        border: `1px solid ${domain.accent}44`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 0 48px ${domain.accent}0c, inset 0 1px 0 ${domain.accent}14`,
        minHeight: 520,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${domain.accent}66, transparent)`,
        }}
      />
      <div
        className="absolute top-4 right-4 w-5 h-5"
        style={{
          borderTop: `1px solid ${domain.accent}44`,
          borderRight: `1px solid ${domain.accent}44`,
        }}
      />
      <div
        className="absolute bottom-4 left-4 w-5 h-5"
        style={{
          borderBottom: `1px solid ${domain.accent}28`,
          borderLeft: `1px solid ${domain.accent}28`,
        }}
      />
      <span
        className="absolute bottom-6 right-8 font-mono font-bold select-none pointer-events-none"
        style={{
          fontSize: 96,
          lineHeight: 1,
          color: `${domain.accent}08`,
          letterSpacing: "-0.05em",
        }}
      >
        {domain.index}
      </span>

      {/* Header */}
      <div className="mb-5 shrink-0">
        <span
          className="inline-block text-xs font-mono tracking-[0.18em] px-2 py-1 rounded mb-4"
          style={{
            background: `${domain.accent}14`,
            border: `1px solid ${domain.accent}30`,
            color: domain.accent,
          }}
        >
          {domain.label}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {domain.title}
        </h3>
        <p
          className="text-xs font-mono tracking-[0.15em] uppercase"
          style={{ color: `${domain.accent}88` }}
        >
          {domain.repos.length} repositor
          {domain.repos.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {/* Repo list */}
      <div
        className="flex-1 overflow-y-auto space-y-1.5 pr-1"
        style={{ scrollbarWidth: "none" }}
      >
        {domain.repos.map((repo) => {
          const langColor = repo.language
            ? (LANG_COLORS[repo.language] ?? "#888")
            : "#555";
          return (
            <a
              key={repo.name}
              href={`https://github.com/June8Yildirim/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 group"
              style={{
                background: `${domain.accent}08`,
                border: `1px solid ${domain.accent}18`,
                textDecoration: "none",
              }}
            >
              {/* Language dot */}
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: langColor }}
              />

              <span className="flex-1 text-sm font-mono text-white group-hover:opacity-75 transition-opacity truncate">
                {repo.name.toUpperCase()}
              </span>

              {repo.language && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0"
                  style={{
                    background: `${langColor}18`,
                    color: langColor,
                    border: `1px solid ${langColor}30`,
                  }}
                >
                  {repo.language}
                </span>
              )}

              {/* External link icon */}
              <svg
                className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ color: domain.accent }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
}
