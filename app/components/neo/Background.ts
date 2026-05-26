import * as THREE from "three";

export class NeuralBackground {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private lines!: THREE.LineSegments;
  private clock = new THREE.Clock(true);
  private raf = 0;
  private particlePositions: Float32Array = new Float32Array();
  private velocities: Float32Array = new Float32Array();
  private linePositions!: THREE.BufferAttribute;
  private particleCount = 180;
  private connectDist = 120;

  constructor(private canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 1, 4000);
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x050510, 1);

    this.buildParticles();
    this.buildLines();

    window.addEventListener("resize", this.onResize);
    this.animate();
  }

  private buildParticles() {
    const N = this.particleCount;
    this.particlePositions = new Float32Array(N * 3);
    this.velocities = new Float32Array(N * 3);

    const W = this.canvas.clientWidth;
    const H = this.canvas.clientHeight;

    for (let i = 0; i < N; i++) {
      this.particlePositions[i * 3] = (Math.random() - 0.5) * W * 1.6;
      this.particlePositions[i * 3 + 1] = (Math.random() - 0.5) * H * 1.6;
      this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      this.velocities[i * 3] = (Math.random() - 0.5) * 0.18;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      this.velocities[i * 3 + 2] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.particlePositions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x3366cc,
      size: 3.5,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private buildLines() {
    const maxLinks = this.particleCount * this.particleCount;
    const linePosArr = new Float32Array(maxLinks * 6);
    const lineGeo = new THREE.BufferGeometry();
    this.linePositions = new THREE.BufferAttribute(linePosArr, 3);
    this.linePositions.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", this.linePositions);

    const mat = new THREE.LineBasicMaterial({
      color: 0x1a3a99,
      transparent: true,
      opacity: 0.22,
    });

    this.lines = new THREE.LineSegments(lineGeo, mat);
    this.scene.add(this.lines);
  }

  private updateParticles() {
    const N = this.particleCount;
    const W = this.canvas.clientWidth;
    const H = this.canvas.clientHeight;
    const hw = W * 0.8;
    const hh = H * 0.8;

    for (let i = 0; i < N; i++) {
      this.particlePositions[i * 3] += this.velocities[i * 3];
      this.particlePositions[i * 3 + 1] += this.velocities[i * 3 + 1];

      if (Math.abs(this.particlePositions[i * 3]) > hw) this.velocities[i * 3] *= -1;
      if (Math.abs(this.particlePositions[i * 3 + 1]) > hh) this.velocities[i * 3 + 1] *= -1;
    }

    (this.particles.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;

    // Update lines
    let linkCount = 0;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = this.particlePositions[i * 3] - this.particlePositions[j * 3];
        const dy = this.particlePositions[i * 3 + 1] - this.particlePositions[j * 3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.connectDist) {
          const base = linkCount * 6;
          this.linePositions.array[base] = this.particlePositions[i * 3];
          this.linePositions.array[base + 1] = this.particlePositions[i * 3 + 1];
          this.linePositions.array[base + 2] = 0;
          this.linePositions.array[base + 3] = this.particlePositions[j * 3];
          this.linePositions.array[base + 4] = this.particlePositions[j * 3 + 1];
          this.linePositions.array[base + 5] = 0;
          linkCount++;
        }
      }
    }
    this.lines.geometry.setDrawRange(0, linkCount * 2);
    this.linePositions.needsUpdate = true;
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate);
    this.updateParticles();
    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
  }
}
