import { useEffect, useState } from "react";
import profileImage from "@/assets/profile.jpg";
import { ChevronDown } from "lucide-react";

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
        {/* Profile image */}
        <div 
          className={`relative mb-8 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Subtle amber ambient glow behind the profile pic matching the sunset tones */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-transparent blur-2xl transform scale-105 pointer-events-none" />
          
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/10">
            <img
              src={profileImage}
              alt="Sidharth M"
              className="w-full h-full object-cover object-[center_48%] transform hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
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
          Video Editor | Creative Director
        </p>

        {/* My works in small under video editor tag */}
        <a
          href="#my-works"
          className={`mt-5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-amber-300 transition-colors duration-300 font-mono group cursor-pointer delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span>my works</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
      
      {/* Subtle bottom scroll line */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out delay-700 pointer-events-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 via-muted-foreground/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
