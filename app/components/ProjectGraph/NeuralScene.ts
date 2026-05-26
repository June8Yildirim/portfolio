import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { GraphNode, GraphEdge } from "./graphUtils";

interface NodeObject {
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
  data: GraphNode;
  pulsePhase: number;
  screenPos: { x: number; y: number; visible: boolean };
}

interface EdgeObject {
  mesh: THREE.Mesh;
  pulseProgress: number;
  speed: number;
}

export class NeuralScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private nodeMap = new Map<string, NodeObject>();
  private edgeObjects: EdgeObject[] = [];
  private clock = new THREE.Clock();
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private raf = 0;
  private hoveredId: string | null = null;
  private selectedId: string | null = null;

  public onNodeClick: ((id: string) => void) | null = null;
  public onScreenPositionsUpdate: ((positions: Map<string, { x: number; y: number; visible: boolean }>) => void) | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    nodes: GraphNode[],
    edges: GraphEdge[]
  ) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050510);
    this.scene.fog = new THREE.FogExp2(0x050510, 0.025);

    // Camera
    this.camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
    this.camera.position.set(0, 4, 22);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Controls
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 40;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;

    this.setupLights();
    this.buildBackground();
    this.buildNodes(nodes);
    this.buildEdges(nodes, edges);
    this.setupEvents();
    this.animate();
  }

  private setupLights() {
    this.scene.add(new THREE.AmbientLight(0x0a1030, 4));
    const l1 = new THREE.PointLight(0x2255ff, 6, 60);
    l1.position.set(8, 8, 8);
    this.scene.add(l1);
    const l2 = new THREE.PointLight(0x6600aa, 4, 60);
    l2.position.set(-12, -4, -8);
    this.scene.add(l2);
    const l3 = new THREE.PointLight(0x003388, 3, 40);
    l3.position.set(0, -10, 5);
    this.scene.add(l3);
  }

  private buildBackground() {
    const COUNT = 400;
    const RANGE = 45;
    const posArr: number[] = [];
    const sizeArr: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      posArr.push(
        (Math.random() - 0.5) * RANGE,
        (Math.random() - 0.5) * RANGE,
        (Math.random() - 0.5) * RANGE
      );
      sizeArr.push(0.04 + Math.random() * 0.08);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x2244aa,
      size: 0.07,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    this.scene.add(new THREE.Points(geo, mat));

    // Neural connections between background particles
    const lineVerts: number[] = [];
    const CONNECT = 7;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT) {
          lineVerts.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
          lineVerts.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
    this.scene.add(
      new THREE.LineSegments(
        lineGeo,
        new THREE.LineBasicMaterial({ color: 0x1a2a66, transparent: true, opacity: 0.18 })
      )
    );
  }

  private buildNodes(nodes: GraphNode[]) {
    nodes.forEach((node) => {
      const geo = new THREE.SphereGeometry(0.55, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0a1540,
        emissive: new THREE.Color(0x0055ee),
        emissiveIntensity: 0.7,
        metalness: 0.6,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.position);
      mesh.userData.id = node.id;
      this.scene.add(mesh);

      // Outer glow shell
      const glowGeo = new THREE.SphereGeometry(0.9, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x0055ff,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(mesh.position);
      this.scene.add(glow);

      this.nodeMap.set(node.id, {
        mesh,
        glow,
        data: node,
        pulsePhase: Math.random() * Math.PI * 2,
        screenPos: { x: 0, y: 0, visible: false },
      });
    });
  }

  private buildEdges(nodes: GraphNode[], edges: GraphEdge[]) {
    edges.forEach((edge) => {
      const src = this.nodeMap.get(edge.sourceId);
      const tgt = this.nodeMap.get(edge.targetId);
      if (!src || !tgt) return;

      const a = src.mesh.position;
      const b = tgt.mesh.position;
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
      mid.x += (Math.random() - 0.5) * 3;
      mid.y += (Math.random() - 0.5) * 3;

      const curve = new THREE.CatmullRomCurve3([a, mid, b]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.035, 5, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x0044cc,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      this.scene.add(tube);

      this.edgeObjects.push({
        mesh: tube,
        pulseProgress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    });
  }

  private setupEvents() {
    this.canvas.addEventListener("click", this.onClick);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("resize", this.onResize);
  }

  private onClick = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = [...this.nodeMap.values()].map((n) => n.mesh);
    const hits = this.raycaster.intersectObjects(meshes);
    if (hits.length > 0) {
      const id = hits[0].object.userData.id as string;
      this.selectedId = id;
      this.controls.autoRotate = false;
      this.onNodeClick?.(id);
    }
  };

  private onMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = [...this.nodeMap.values()].map((n) => n.mesh);
    const hits = this.raycaster.intersectObjects(meshes);
    const newHover = hits.length > 0 ? (hits[0].object.userData.id as string) : null;
    if (newHover !== this.hoveredId) {
      this.hoveredId = newHover;
      this.canvas.style.cursor = newHover ? "pointer" : "grab";
    }
  };

  private onResize = () => {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  flyToNode(id: string) {
    const node = this.nodeMap.get(id);
    if (!node) return;
    const target = node.mesh.position.clone();
    const offset = target.clone().normalize().multiplyScalar(6).add(target);
    offset.y += 1.5;

    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    let t = 0;

    const fly = () => {
      t = Math.min(t + 0.025, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      this.camera.position.lerpVectors(startPos, offset, ease);
      this.controls.target.lerpVectors(startTarget, target, ease);
      this.controls.update();
      if (t < 1) requestAnimationFrame(fly);
    };
    fly();
  }

  resetView() {
    this.selectedId = null;
    this.controls.autoRotate = true;

    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const endPos = new THREE.Vector3(0, 4, 22);
    const endTarget = new THREE.Vector3(0, 0, 0);
    let t = 0;

    const reset = () => {
      t = Math.min(t + 0.02, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      this.camera.position.lerpVectors(startPos, endPos, ease);
      this.controls.target.lerpVectors(startTarget, endTarget, ease);
      this.controls.update();
      if (t < 1) requestAnimationFrame(reset);
    };
    reset();
  }

  private computeScreenPositions(): Map<string, { x: number; y: number; visible: boolean }> {
    const result = new Map<string, { x: number; y: number; visible: boolean }>();
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;

    this.nodeMap.forEach((node, id) => {
      const vec = node.mesh.position.clone();
      vec.project(this.camera);
      const x = ((vec.x + 1) / 2) * w;
      const y = ((-vec.y + 1) / 2) * h;
      const visible = vec.z < 1;
      result.set(id, { x, y, visible });
    });
    return result;
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate);
    const t = this.clock.getElapsedTime();

    this.controls.update();

    // Animate nodes
    this.nodeMap.forEach((node) => {
      const mat = node.mesh.material as THREE.MeshStandardMaterial;
      const isActive = node.data.id === this.hoveredId || node.data.id === this.selectedId;

      mat.emissiveIntensity = isActive
        ? 1.4
        : 0.55 + Math.sin(t * 1.8 + node.pulsePhase) * 0.25;

      const glowMat = node.glow.material as THREE.MeshBasicMaterial;
      if (isActive) {
        glowMat.opacity = 0.22;
        glowMat.color.set(0x2288ff);
        node.glow.scale.setScalar(1.4 + Math.sin(t * 3) * 0.06);
      } else {
        glowMat.opacity = 0.07;
        glowMat.color.set(0x0055ff);
        node.glow.scale.setScalar(1);
      }
    });

    // Animate edges (synapse pulse)
    this.edgeObjects.forEach((edge) => {
      edge.pulseProgress = (edge.pulseProgress + edge.speed) % 1;
      const mat = edge.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(edge.pulseProgress * Math.PI * 2) * 0.18;
    });

    this.renderer.render(this.scene, this.camera);

    // Push screen positions to React
    this.onScreenPositionsUpdate?.(this.computeScreenPositions());
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener("click", this.onClick);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("resize", this.onResize);
    this.controls.dispose();
    this.renderer.dispose();
  }
}
