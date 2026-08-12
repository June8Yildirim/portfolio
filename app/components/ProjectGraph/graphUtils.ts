import { projects } from "~/constats/projects";
import { projectDetail } from "~/constats/projectDetails";
import type { ProjectDetailsItemType } from "~/types/ProjectDetailsItemType";

export interface GraphNode {
  id: string;
  index: number;
  title: string;
  company: string;
  technologies: string[];
  gradient: string;
  mainImage?: string;
  images?: string[];
  achievements: string[];
  position: [number, number, number];
  detail?: ProjectDetailsItemType;
}

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  sharedTech: string[];
}

function fibonacciSphere(
  count: number,
  radius: number,
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = (1 - (i / (count - 1)) * 2) * radius * 0.65;
    const r = Math.sqrt(Math.max(0, 1 - (y / (radius * 0.65)) ** 2)) * radius;
    const theta = phi * i;
    positions.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return positions;
}

export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const positions = fibonacciSphere(projects.length, 10);

  const nodes: GraphNode[] = projects.map((p, i) => ({
    id: `${p.id}_${i}`,
    index: i,
    title: p.title,
    company: p.company,
    technologies: p.technologies,
    gradient: p.gradient,
    mainImage: (p as any).mainImage,
    images: (p as any).images,
    achievements: p.achievements,
    position: positions[i],
    detail: projectDetail.find((d) => d.id === p.id),
  }));

  const edges: GraphEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const shared = nodes[i].technologies.filter((t) =>
        nodes[j].technologies.includes(t),
      );
      if (shared.length >= 1) {
        edges.push({
          sourceId: nodes[i].id,
          targetId: nodes[j].id,
          sharedTech: shared,
        });
      }
    }
  }

  return { nodes, edges };
}
