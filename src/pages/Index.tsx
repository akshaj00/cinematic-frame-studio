import CinematicBackground from "@/components/CinematicBackground";
import FilmGrain from "@/components/FilmGrain";
import Hero from "@/components/Hero";
import VideoGrid from "@/components/VideoGrid";
import Tools from "@/components/Tools";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <CinematicBackground />
      <FilmGrain />
      <Hero />
      <VideoGrid />
      <Tools />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
