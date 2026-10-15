import { useEffect, useRef, useState } from "react";
import { Sparkles, Volume2, Film, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: Film,
    title: "Retention & Pacing",
    description:
      "Crafting rhythmic cuts, dynamic speedramps, and hooks that engage viewers from the first second.",
  },
  {
    icon: Volume2,
    title: "Layered Sound Design",
    description:
      "Sculpting immersive audio, atmospheric textures, and hard-hitting impacts that bring visual cuts to life.",
  },
  {
    icon: Sparkles,
    title: "Cinematic Color Science",
    description:
      "Grading with depth, organic skin tones, and tailored film emulation to give every project a distinctive look.",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 relative"
    >
      {/* Section Header on Left */}
      <div className="mb-14 pb-6 border-b border-white/10">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-2 font-mono">
          Biography
        </span>
        <h2
          className={`font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-foreground transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ABOUT ME
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Story & Philosophy */}
        <div
          className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-foreground/95">
            Turning raw footage into rhythmic, cinematic stories that demand attention.
          </p>

          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
            <p>
              I’m <span className="text-foreground font-normal">Sidharth M</span>, a video editor
              and creative director driven by the rhythm, emotion, and technical finesse of visual
              storytelling. I specialize in high-impact short-form reels, brand commercials, and
              cinematic visual stories built for modern audiences.
            </p>

            <p>
              For me, great editing is invisible yet unforgettable. It’s about knowing precisely when
              to hold a frame to let an emotion breathe, and when to cut aggressively on a beat to
              create kinetic energy. Every transition, sound cue, and color choice serves the
              story.
            </p>
          </div>

          {/* Quick Meta tags */}
          <div className="pt-4 flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              Short-Form Reels
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              Cinematic Color Grading
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              Sound Design & Mixing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              Motion Graphics
            </span>
          </div>

          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-amber-400 hover:text-amber-300 font-mono transition-colors group"
            >
              <span>Let's collaborate on your next cut</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: 3 Pillars of Craft */}
        <div
          className={`lg:col-span-5 space-y-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/10 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground tracking-wide">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light pl-[3.25rem]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
