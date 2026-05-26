import { useEffect, useRef, useState, useCallback } from "react";
import { NeuralScene } from "./NeuralScene";
import NodePanel from "./NodePanel";
import { buildGraph } from "./graphUtils";
import type { GraphNode } from "./graphUtils";

const { nodes, edges } = buildGraph();

interface NodeLabel {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  title: string;
  technologies: string[];
}

interface Props {
  onClose: () => void;
}

export default function ProjectGraph({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<NeuralScene | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [labels, setLabels] = useState<NodeLabel[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;

    const scene = new NeuralScene(canvasRef.current, nodes, edges);

    scene.onNodeClick = (id) => {
      const node = nodes.find((n) => n.id === id) ?? null;
      setSelectedNode(node);
      if (node) scene.flyToNode(id);
    };

    scene.onScreenPositionsUpdate = (positions) => {
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
    };

    sceneRef.current = scene;
    return () => scene.dispose();
  }, [mounted]);

  const handleClose = useCallback(() => {
    setSelectedNode(null);
    sceneRef.current?.resetView();
  }, []);

  const handleOverlayClose = useCallback(() => {
    handleClose();
    onClose();
  }, [handleClose, onClose]);

  return (
    <div className="fixed inset-0 z-50" style={{ background: "#050510" }}>
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(to bottom, rgba(5,5,20,0.95) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <p className="text-xs font-mono tracking-widest mb-0.5" style={{ color: "#4488ff" }}>
            NEURAL PROJECT GRAPH
          </p>
          <p className="text-white font-semibold text-sm">
            {nodes.length} projects · {edges.length} connections
          </p>
        </div>
        <button
          onClick={handleOverlayClose}
          className="text-gray-400 hover:text-white transition-colors text-sm font-mono"
          style={{ pointerEvents: "auto" }}
        >
          ✕ CLOSE
        </button>
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-6 left-6 z-10 text-xs font-mono space-y-1.5"
        style={{ color: "#334466", pointerEvents: "none" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "#0066ff" }} />
          <span>Project node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-px" style={{ background: "#0044cc" }} />
          <span>Shared technology</span>
        </div>
        <p className="mt-2" style={{ color: "#223355" }}>Drag to orbit · Scroll to zoom</p>
      </div>

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ cursor: "grab" }}
      />

      {/* Node labels — HTML positioned over canvas */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {labels.map((label) => {
          if (!label.visible) return null;
          const panelWidth = selectedNode ? Math.min(520, window.innerWidth * 0.38) : 0;
          const rightBound = window.innerWidth - panelWidth - 20;
          if (label.x > rightBound || label.x < 20) return null;

          return (
            <div
              key={label.id}
              className="absolute"
              style={{
                left: label.x,
                top: label.y - 52,
                transform: "translateX(-50%)",
              }}
            >
              {/* Title */}
              <div
                className="text-center mb-1"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  color: "#88aaff",
                  textShadow: "0 0 8px rgba(0,80,255,0.8)",
                  whiteSpace: "nowrap",
                }}
              >
                {label.title}
              </div>
              {/* Tech tags */}
              <div className="flex gap-1 justify-center flex-wrap" style={{ maxWidth: 160 }}>
                {label.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: 8,
                      fontFamily: "monospace",
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: "rgba(0, 30, 80, 0.75)",
                      border: "1px solid rgba(0,80,200,0.3)",
                      color: "#6688cc",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <NodePanel node={selectedNode} onClose={handleClose} />
      )}
    </div>
  );
}
