import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, RotateCw, Sparkles, Navigation } from "lucide-react";

interface WobbleSpiralProps {
  onSelectDestination?: (dest: string) => void;
}

export const WobbleSpiralSection: React.FC<WobbleSpiralProps> = ({ onSelectDestination }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTitle, setActiveTitle] = useState("Vórtice Panorâmico de Destinos");
  const [isSpinningFast, setIsSpinningFast] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const destinations = [
      { name: "Kelingking Secret Bay", location: "Bali, Indonésia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" },
      { name: "Caldera Oia Cliffs", location: "Santorini, Grécia", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80" },
      { name: "Atol de Vaadhoo Bioluminescente", location: "Maldivas", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&q=80" },
      { name: "Pico de Matterhorn Alpino", location: "Suíça", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80" },
      { name: "Glaciar Perito Moreno", location: "Patagônia, Argentina", img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=700&q=80" },
      { name: "Santuário Arashiyama Bamboo", location: "Kyoto, Japão", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80" },
      { name: "Fiordes de Milford Sound", location: "Nova Zelândia", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80" },
      { name: "Deserto de Wadi Rum", location: "Jordânia", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80" }
    ];

    const settings = {
      radius: 2.2,
      verticalGap: 0.85,
      angleGap: 0.78,
      cardWidth: 1.45,
      cardHeight: 1.9,
      idleSpin: 0.0035,
      scrollSensitivity: 0.003,
      smoothing: 0.08,
      wobbleStrength: 0.35,
    };

    const vertexShader = `
      uniform float uWobble;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        viewPosition.x += sin(uv.y * 3.14159) * uWobble;
        viewPosition.z += cos(uv.x * 3.14159) * (uWobble * 0.4);
        gl_Position = projectionMatrix * viewPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(uTexture, vUv);
        // Vignette subtle edges
        float dist = distance(vUv, vec2(0.5));
        color.rgb *= smoothstep(0.8, 0.2, dist * 0.6);
        if (!gl_FrontFacing) {
          color.rgb = mix(color.rgb, vec3(0.08, 0.16, 0.22), 0.8);
        }
        gl_FragColor = vec4(color.rgb, uOpacity);
      }
    `;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 8.5;
    camera.position.y = 0.2;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const fullList = [...destinations, ...destinations];
    const cardCount = fullList.length;
    const geometry = new THREE.PlaneGeometry(settings.cardWidth, settings.cardHeight, 16, 16);
    const wobble = { value: 0 };

    const cards = fullList.map((item) => {
      const texture = textureLoader.load(item.img);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
          uTexture: { value: texture },
          uWobble: { value: wobble.value },
          uOpacity: { value: 1.0 }
        },
      });
      const mesh = new THREE.Mesh(geometry, material);
      (mesh as any).userData = { ...item };
      scene.add(mesh);
      return { mesh, material, data: item };
    });

    const state = {
      rotation: 0,
      rotationTarget: 0,
      isDragging: false,
      lastY: 0
    };

    const handlePointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.lastY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!state.isDragging) return;
      const delta = e.clientY - state.lastY;
      state.lastY = e.clientY;
      state.rotationTarget += delta * 0.008;
    };

    const handlePointerUp = () => {
      state.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      state.rotationTarget += e.deltaY * settings.scrollSensitivity;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("wheel", handleWheel, { passive: true });

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let lastTick = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - lastTick) / 1000;
      lastTick = now;

      state.rotationTarget += isSpinningFast ? settings.idleSpin * 4 : settings.idleSpin;
      state.rotation += (state.rotationTarget - state.rotation) * settings.smoothing;

      const lag = THREE.MathUtils.clamp(state.rotationTarget - state.rotation, -1.2, 1.2);
      wobble.value += (lag * settings.wobbleStrength - wobble.value) * settings.smoothing;

      let closestCard: any = null;
      let minDistanceToCenter = 999;

      cards.forEach(({ mesh, material }, index) => {
        material.uniforms.uWobble.value = wobble.value;

        const slot = ((index - state.rotation) % cardCount + cardCount) % cardCount - cardCount / 2;
        const angle = slot * settings.angleGap + Math.PI / 2;

        mesh.position.set(
          Math.cos(angle) * settings.radius,
          slot * settings.verticalGap,
          Math.sin(angle) * settings.radius
        );

        mesh.rotation.y = Math.PI / 2 - angle;
        mesh.rotation.x = wobble.value * 0.15;

        const distFromCenter = Math.abs(mesh.position.z - settings.radius);
        if (distFromCenter < minDistanceToCenter) {
          minDistanceToCenter = distFromCenter;
          closestCard = mesh.userData;
        }
      });

      if (closestCard && closestCard.name) {
        setActiveTitle(`${closestCard.name} — ${closestCard.location}`);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
    };
  }, [isSpinningFast]);

  return (
    <section className="relative w-full min-h-[92vh] bg-gradient-to-b from-[#050d12] via-[#081820] to-[#050d12] py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between">
      {/* Background glow radial */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(78,237,184,0.06),transparent_65%)]" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#4eedb8]/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-widest text-[#4eedb8] mb-3">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "14s" }} />
          <span>Módulo de Navegação Helicoidal 3D (Wobble GLSL Engine)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-editorial font-bold text-white tracking-tight leading-tight">
          Espiral de Destinos & Territórios Intocados
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 mt-2 max-w-xl mx-auto font-light">
          Gire a hélice tridimensional e observe a deformação senoidal em tempo real via vertex shader GLSL conforme a altitude e velocidade de órbita.
        </p>
      </div>

      {/* 3D Canvas Box */}
      <div ref={containerRef} className="relative w-full max-w-6xl h-[620px] rounded-3xl overflow-hidden border border-white/10 glass-panel shadow-2xl cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Telemetry Badge in bottom-left */}
        <div className="absolute bottom-6 left-6 z-20 glass-card px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/10 max-w-md">
          <div className="w-3 h-3 rounded-full bg-[#4eedb8] animate-ping" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#4eedb8] tracking-widest uppercase">Destino em Foco Orbital</span>
            <span className="text-sm font-semibold text-white tracking-wide truncate">{activeTitle}</span>
          </div>
        </div>

        {/* Floating controls in top-right */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2.5">
          <button
            onClick={() => setIsSpinningFast(!isSpinningFast)}
            className="glass-card hover:bg-[#4eedb8]/15 px-3.5 py-2 rounded-xl text-xs font-mono-tech text-white flex items-center gap-2 border border-white/15 transition-all"
            title="Acelerar Rotação Giroscópica"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#4eedb8] ${isSpinningFast ? "animate-spin" : ""}`} />
            <span>{isSpinningFast ? "Velocidade Hiperbólica" : "Giro Padrão"}</span>
          </button>
          <div className="glass-card px-3 py-2 rounded-xl text-[11px] font-mono-tech text-slate-300 border border-white/10 hidden sm:flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#4eedb8]" />
            <span>Arraste ou use o scroll para rotacionar</span>
          </div>
        </div>
      </div>
    </section>
  );
};
