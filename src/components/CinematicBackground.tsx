import { useEffect, useRef } from "react";

const CinematicBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const idleTimeRef = useRef(0);
  const driftPhaseRef = useRef(0);

  useEffect(() => {
    let animationId: number;
    
    // Smooth lerp factor (lower = smoother/slower)
    const LERP_FACTOR = 0.03;
    const MAX_OFFSET = 40; // max px movement
    const IDLE_THRESHOLD = 2000; // ms before drift kicks in
    
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      idleTimeRef.current = 0;
    };

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      idleTimeRef.current += 16; // ~60fps
      
      // Organic drift when idle
      if (idleTimeRef.current > IDLE_THRESHOLD) {
        driftPhaseRef.current += 0.002;
        targetRef.current = {
          x: 0.5 + Math.sin(driftPhaseRef.current) * 0.1,
          y: 0.5 + Math.cos(driftPhaseRef.current * 0.7) * 0.08,
        };
      }

      // Smooth interpolation
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * LERP_FACTOR;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * LERP_FACTOR;

      const offsetX = (mouseRef.current.x - 0.5) * MAX_OFFSET * 2;
      const offsetY = (mouseRef.current.y - 0.5) * MAX_OFFSET * 2;

      // Apply transforms to light leak elements
      const leaks = container.querySelectorAll<HTMLElement>('.light-leak');
      leaks.forEach((leak, i) => {
        const multiplier = 1 + i * 0.3; // Different speeds for depth
        const x = offsetX * multiplier;
        const y = offsetY * multiplier;
        leak.style.transform = `translate(${x}px, ${y}px)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none bg-background"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Warm amber leak - top right */}
      <div
        className="light-leak absolute transition-transform duration-700 ease-out"
        style={{
          top: '-10%',
          right: '-5%',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse at center, hsla(35, 70%, 55%, 0.25) 0%, hsla(35, 60%, 45%, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Soft purple leak - bottom left */}
      <div
        className="light-leak absolute transition-transform duration-700 ease-out"
        style={{
          bottom: '-10%',
          left: '-10%',
          width: '60vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at center, hsla(280, 50%, 45%, 0.2) 0%, hsla(270, 40%, 35%, 0.08) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Deep blue leak - center right */}
      <div
        className="light-leak absolute transition-transform duration-700 ease-out"
        style={{
          top: '40%',
          right: '-10%',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center, hsla(220, 60%, 40%, 0.18) 0%, hsla(210, 50%, 30%, 0.06) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary warm leak - left side */}
      <div
        className="light-leak absolute transition-transform duration-700 ease-out"
        style={{
          top: '20%',
          left: '-15%',
          width: '45vw',
          height: '45vh',
          background: 'radial-gradient(ellipse at center, hsla(25, 65%, 50%, 0.15) 0%, transparent 60%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
};

export default CinematicBackground;
