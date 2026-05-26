import { useEffect, useRef } from "react";
import { NeuralBackground } from "./Background";
import Nav from "./Nav";
import Hero from "./Hero";
import Projects, { type ProjectsHandle } from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

export default function NeoPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<NeuralBackground | null>(null);
  const projectsRef = useRef<ProjectsHandle>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    bgRef.current = new NeuralBackground(canvasRef.current);
    return () => bgRef.current?.dispose();
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "#050510", color: "white" }}>
      {/* Persistent neural background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content layer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Nav />
        <Hero onProjectsClick={() => projectsRef.current?.focusGraph()} />

        {/* Divider glow */}
        <div className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.25), transparent)" }} />

        <Projects ref={projectsRef} />

        <div className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.15), transparent)" }} />

        <Experience />

        <div className="h-px mx-8 md:mx-24" style={{ background: "linear-gradient(to right, transparent, rgba(0,100,255,0.15), transparent)" }} />

        <Contact />
      </div>
    </div>
  );
}
