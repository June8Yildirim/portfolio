import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Variant = "reveal" | "blocks";

interface ScrambleTextProps {
  /** One entry per line. Each line scrambles itself into place. */
  lines: string[];
  /**
   * "reveal" (default): scrambles in and settles into clean typography that the
   * parent controls — for headings and names.
   * "blocks": the alternating highlighted-block demo look.
   */
  variant?: Variant;
  /** Character pool: "upperCase" | "lowerCase" | "upperAndLowerCase" | custom string. */
  chars?: string;
  /** How many times each character cycles through random values before locking. */
  rotations?: number;
  /** Seconds each line takes to fully resolve. */
  duration?: number;
  /** Delay between the start of consecutive lines (the stagger). */
  stagger?: number;
  /** Delay (s) before the whole animation begins. */
  delay?: number;
  className?: string;
}

const CHAR_POOLS: Record<string, string> = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
};

const escapeHTML = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Build one frame: the first `resolved` characters are locked to the target
 * (settled), the rest show a random character from the pool (scrambling).
 * Each character is its own span so the CSS can style scrambling vs. settled.
 */
function frameHTML(
  target: string,
  pool: string,
  resolved: number,
  settledClass: string,
) {
  let out = "";
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === " ") {
      out += " ";
    } else if (i < resolved) {
      out += `<span class="${settledClass}">${escapeHTML(ch)}</span>`;
    } else {
      const r = pool[(Math.random() * pool.length) | 0];
      out += `<span class="sc-old">${escapeHTML(r)}</span>`;
    }
  }
  return out;
}

export default function ScrambleText({
  lines,
  variant = "reveal",
  chars = "upperCase",
  rotations = 90,
  duration = 1,
  stagger = 0.2,
  delay = 0,
  className = "",
}: ScrambleTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  lineRefs.current = [];

  useGSAP(
    () => {
      const pool = CHAR_POOLS[chars] ?? chars;
      const steps = Math.max(1, Math.round(rotations));
      const master = gsap.timeline({ id: "ScrambleText", delay });

      lineRefs.current.forEach((element, index) => {
        const target = element.dataset.text ?? "";
        // In "blocks" mode odd lines settle to the inverted style; otherwise clean.
        const settledClass =
          variant === "blocks" && index % 2 !== 0 ? "sc-old" : "sc-new";

        const state = { step: 0 };
        let lastStep = -1;

        const tl = gsap.timeline();
        tl.set(element, { opacity: 1 });
        tl.to(state, {
          step: steps,
          duration,
          // Discrete steps → the scramble refreshes exactly `steps` times, then stops.
          ease: `steps(${steps})`,
          onUpdate: () => {
            const step = Math.round(state.step);
            if (step === lastStep) return; // only redraw when the step advances
            lastStep = step;
            const resolved = Math.round((step / steps) * target.length);
            element.innerHTML = frameHTML(target, pool, resolved, settledClass);
          },
          onComplete: () => {
            // Lock every character to its settled state.
            element.innerHTML = frameHTML(
              target,
              pool,
              target.length,
              settledClass,
            );
          },
        });

        master.add(tl, index * stagger);
      });
    },
    {
      scope: rootRef,
      dependencies: [lines, variant, chars, duration, stagger, delay],
    },
  );

  const collect = (el: HTMLDivElement | null) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  };

  return (
    <div ref={rootRef} className={`sc-root sc-${variant} ${className}`}>
      {lines.map((line, i) => (
        // Rendered empty (GSAP fills it from data-text). Empty on both server
        // and client, so hydration matches and React leaves the DOM text alone.
        <div key={i} ref={collect} className="scrambled" data-text={line} />
      ))}

      <style>{`
        .scrambled { opacity: 0; }
        .scrambled span { display: inline-block; }

        /* ── reveal: professional. Typography inherits from the parent. ── */
        .sc-reveal .scrambled {
          font: inherit;
          color: inherit;
          letter-spacing: inherit;
        }
        /* characters still scrambling — a soft blue glow */
        .sc-reveal .sc-old {
          color: #4d7dff;
          text-shadow: 0 0 10px rgba(77, 125, 255, 0.55);
        }
        /* characters that have settled — clean, inherits the parent's color */
        .sc-reveal .sc-new {
          color: inherit;
          text-shadow: none;
        }

        /* ── blocks: the original highlighted-block demo look ── */
        .sc-blocks .scrambled {
          font-size: clamp(24px, 5vw, 40px);
          font-weight: 300;
          color: #ddd;
          min-height: 1.2em;
          font-family: "Inconsolata", ui-monospace, monospace;
        }
        .sc-blocks .sc-old { color: #4488ff; background: #556688; }
        .sc-blocks .sc-new { color: #334466; background: #4488ff; }
      `}</style>
    </div>
  );
}
