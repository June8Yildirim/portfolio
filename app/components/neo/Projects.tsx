import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { NeuralScene } from "~/components/ProjectGraph/NeuralScene";
import NodePanel from "~/components/ProjectGraph/NodePanel";
import { buildGraph } from "~/components/ProjectGraph/graphUtils";
import type { GraphNode } from "~/components/ProjectGraph/graphUtils";

const { nodes, edges } = buildGraph();

interface LabelData {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  title: string;
  technologies: string[];
}

export interface ProjectsHandle {
  focusGraph: () => void;
}

const Projects = forwardRef<ProjectsHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<NeuralScene | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [labels, setLabels] = useState<LabelData[]>([]);
  const [ready, setReady] = useState(false);

  useImperativeHandle(ref, () => ({
    focusGraph: () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new NeuralScene(canvasRef.current, nodes, edges);

    scene.onNodeClick = (id) => {
      const node = nodes.find((n) => n.id === id) ?? null;
      setSelectedNode(node);
      if (node) scene.flyToNode(id);
    };

    scene.onScreenPositionsUpdate = (positions) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setLabels(
        nodes.map((n) => {
          const pos = positions.get(n.id) ?? { x: 0, y: 0, visible: false };
          return {
            id: n.id,
            x: pos.x,
            y: pos.y,
            visible: pos.visible,
            title: n.title,
            technologies: n.technologies.slice(0, 3),
          };
        })
      );
      if (!ready && rect.width > 0) setReady(true);
    };

    sceneRef.current = scene;
    return () => scene.dispose();
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
      <div className="text-center pt-24 pb-8 px-6 relative z-10">
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
          {labels.map((label) => {
            if (!label.visible) return null;
            const panelW = selectedNode ? Math.min(520, window.innerWidth * 0.38) : 0;
            const rightBound = (canvasRef.current?.clientWidth ?? window.innerWidth) - panelW - 24;
            if (label.x > rightBound || label.x < 16) return null;

            return (
              <div
                key={label.id}
                className="absolute"
                style={{ left: label.x, top: label.y - 54, transform: "translateX(-50%)" }}
              >
                <div
                  className="text-center mb-1 whitespace-nowrap"
                  style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.06em", color: "#88aaff", textShadow: "0 0 10px rgba(0,100,255,0.7)" }}
                >
                  {label.title}
                </div>
                <div className="flex gap-1 justify-center flex-wrap" style={{ maxWidth: 160 }}>
                  {label.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{ fontSize: 8, fontFamily: "monospace", padding: "1px 5px", borderRadius: 4, background: "rgba(0,20,70,0.8)", border: "1px solid rgba(0,80,200,0.28)", color: "#5577aa", whiteSpace: "nowrap" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
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
