import { useEffect, useRef, useState } from "react";

const toolsList = [
  {
    name: "Premiere Pro",
    fullName: "Adobe Premiere Pro",
    logo: "/tools/premiere-pro.svg",
    borderGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
  },
  {
    name: "After Effects",
    fullName: "Adobe After Effects",
    logo: "/tools/after-effects.svg",
    borderGlow: "group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_35px_rgba(217,70,239,0.25)]",
  },
  {
    name: "DaVinci Resolve",
    fullName: "DaVinci Resolve",
    logo: "/tools/davinci-resolve.svg",
    borderGlow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
  },
];

const Tools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 relative"
    >
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-10 md:gap-16 border-t border-b border-white/10 py-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left Side: Heading and simple description */}
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3 font-mono">
            Stack & Workflow
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-foreground mb-4">
            TOOLS I USE
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
            Industry-standard tools for seamless editing, motion design, and cinematic color grading.
          </p>
        </div>

        {/* Right Side: All three logos */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-wrap sm:flex-nowrap">
          {toolsList.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-3.5 group cursor-pointer"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-card/60 border border-white/10 p-4 sm:p-5 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 ${tool.borderGlow}`}
              >
                <img
                  src={tool.logo}
                  alt={tool.fullName}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  loading="lazy"
                />
              </div>
              <span className="text-xs sm:text-sm tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors font-mono text-center">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
