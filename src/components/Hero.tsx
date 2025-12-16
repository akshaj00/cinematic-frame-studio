import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-portrait.png";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Portrait image */}
        <div 
          className={`relative mb-8 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src={heroImage}
            alt="Portrait"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
          />
        </div>
        
        {/* Name */}
        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] text-foreground transition-all duration-1000 ease-out delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          SIDHARTH M
        </h1>
        
        {/* Role */}
        <p 
          className={`mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-light transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Cinematic Video Editor
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent opacity-50" />
      </div>
    </section>
  );
};

export default Hero;
