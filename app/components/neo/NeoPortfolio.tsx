import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NeuralBackground } from "./Background";
import Nav from "./Nav";
import Hero from "./Hero";
import Projects, { type ProjectsHandle } from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import Contact from "./Contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function NeoPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<NeuralBackground | null>(null);
  const projectsRef = useRef<ProjectsHandle>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    bgRef.current = new NeuralBackground(canvasRef.current);
    return () => bgRef.current?.dispose();
  }, []);

  // Section headings rise in and dividers draw out from the center as they scroll into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el.children, {
            autoAlpha: 0,
            y: 28,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-divider]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: contentRef },
  );

  return (
    <div className="relative min-h-screen" style={{ background: "#050510", color: "white" }}>
      {/* Persistent neural background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content layer */}
      <div ref={contentRef} className="relative" style={{ zIndex: 10 }}>
        <Nav />
        <Hero onProjectsClick={() => projectsRef.current?.focusGraph()} />

        {/* Divider glow */}
        <div data-divider className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.25), transparent)" }} />

        <Projects ref={projectsRef} />

        <div data-divider className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.15), transparent)" }} />

        <Education />

        <div data-divider className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.15), transparent)" }} />

        <Experience />

        <div data-divider className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.15), transparent)" }} />

        <Contact />
      </div>
    </div>
  );
}
