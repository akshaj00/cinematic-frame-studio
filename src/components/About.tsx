import { useEffect, useRef, useState } from "react";

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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl">
        {/* Section title */}
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-foreground mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ABOUT
        </h2>

        {/* About text */}
        <div
          className={`space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground/90">
            I craft cinematic stories through motion.
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Based in Los Angeles, I specialize in travel films, brand documentaries, 
            and visual storytelling that captures raw emotion and authentic moments. 
            My work focuses on creating immersive experiences that transport viewers 
            to distant places and connect them with powerful narratives.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Every frame is intentional. Every cut serves the story.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
