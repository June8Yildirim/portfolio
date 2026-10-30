import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { NeuralScene } from "~/components/ProjectGraph/NeuralScene";
import NodePanel from "~/components/ProjectGraph/NodePanel";
import { buildGraph } from "~/components/ProjectGraph/graphUtils";
import type { GraphNode } from "~/components/ProjectGraph/graphUtils";

const { nodes, edges } = buildGraph();

export interface ProjectsHandle {
  focusGraph: () => void;
}

const Projects = forwardRef<ProjectsHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<NeuralScene | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRefs = useRef(new Map<string, HTMLDivElement>());
  const selectedRef = useRef<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  selectedRef.current = selectedNode;

  useImperativeHandle(ref, () => ({
    focusGraph: () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new NeuralScene(canvas, nodes, edges);

    scene.onNodeClick = (id) => {
      const node = nodes.find((n) => n.id === id) ?? null;
      setSelectedNode(node);
      if (node) scene.flyToNode(id);
    };

    // Runs every frame — write straight to the DOM instead of going through React state.
    scene.onScreenPositionsUpdate = (positions) => {
      const panelW = selectedRef.current ? Math.min(520, window.innerWidth * 0.38) : 0;
      const rightBound = canvas.clientWidth - panelW - 24;

      labelRefs.current.forEach((el, id) => {
        const pos = positions.get(id);
        const shown = !!pos && pos.visible && pos.x <= rightBound && pos.x >= 16;
        if (pos) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y - 54}px, 0) translateX(-50%)`;
        }
        el.style.opacity = shown ? String(pos.reveal) : "0";
      });
    };

    sceneRef.current = scene;

    // Only render while the graph is on screen and the tab is visible.
    let inView = false;
    let introPlayed = false;
    const sync = () => scene.setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !introPlayed) {
          introPlayed = true;
          scene.playIntro();
        }
        sync();
      },
      { threshold: 0.15 }
    );
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      scene.dispose();
    };
  }, []);

  const handleClose = useCallback(() => {
    setSelectedNode(null);
    sceneRef.current?.resetView();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col"
      style={{ background: "rgba(5, 5, 18, 0.0)" }}
    >
      {/* Section header */}
      <div data-reveal className="text-center pt-24 pb-8 px-6 relative z-10">
        <p className="text-xs font-mono tracking-[0.25em] uppercase mb-3" style={{ color: "#4488ff" }}>
          Neural Graph
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Projects
        </h2>
        <p className="text-sm font-mono" style={{ color: "#334466" }}>
          {nodes.length} projects · {edges.length} tech connections · click any node to explore
        </p>
      </div>

      {/* Graph canvas container */}
      <div className="relative flex-1 mx-4 md:mx-8 mb-8 rounded-2xl overflow-hidden" style={{ minHeight: "70vh", border: "1px solid rgba(0,80,200,0.15)" }}>
        <canvas ref={canvasRef} className="w-full h-full block" style={{ cursor: "grab" }} />

        {/* Node labels */}
        <div className="absolute inset-0 pointer-events-none">
          {nodes.map((node) => (
            <div
              key={node.id}
              ref={(el) => {
                if (el) labelRefs.current.set(node.id, el);
                else labelRefs.current.delete(node.id);
              }}
              className="absolute left-0 top-0"
              style={{ opacity: 0, transition: "opacity 0.25s ease", willChange: "transform" }}
            >
              <div
                className="text-center mb-1 whitespace-nowrap"
                style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.06em", color: "#88aaff", textShadow: "0 0 10px rgba(0,100,255,0.7)" }}
              >
                {node.title}
              </div>
              <div className="flex gap-1 justify-center flex-wrap" style={{ maxWidth: 160 }}>
                {node.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    style={{ fontSize: 8, fontFamily: "monospace", padding: "1px 5px", borderRadius: 4, background: "rgba(0,20,70,0.8)", border: "1px solid rgba(0,80,200,0.28)", color: "#5577aa", whiteSpace: "nowrap" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Corner hint */}
        <div className="absolute bottom-4 left-4 text-xs font-mono pointer-events-none" style={{ color: "#223355" }}>
          drag · scroll · click
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div className="absolute inset-y-0 right-0 flex items-center" style={{ width: "clamp(300px,36%,480px)" }}>
            <div className="w-full h-full overflow-hidden rounded-r-2xl">
              <NodePanel node={selectedNode} onClose={handleClose} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
