import { useRef, useState, useEffect } from "react";
import VideoModal, { Video } from "./VideoModal";
import { Play } from "lucide-react";

const userVideos: Video[] = [
  { id: 1, title: "Work 01", tag: "Cinematic Reel", videoUrl: "/videos/reel-01.mp4" },
  { id: 2, title: "Work 02", tag: "Visual Motion", videoUrl: "/videos/reel-02.mp4" },
  { id: 3, title: "Work 03", tag: "Travel Story", videoUrl: "/videos/reel-03.mp4" },
  { id: 4, title: "Work 04", tag: "Rhythm & Cut", videoUrl: "/videos/reel-04.mp4" },
  { id: 5, title: "Work 05", tag: "Atmospheric Edit", videoUrl: "/videos/reel-05.mp4" },
  { id: 6, title: "Work 06", tag: "Color & Mood", videoUrl: "/videos/reel-06.mp4" },
  { id: 7, title: "Work 07", tag: "Visual Flow", videoUrl: "/videos/reel-07.mp4" },
  { id: 8, title: "Work 08", tag: "Cinematic Edit", videoUrl: "/videos/reel-08.mp4" },
  { id: 9, title: "Work 09", tag: "Dynamic Story", videoUrl: "/videos/reel-09.mp4" },
  { id: 10, title: "Work 10", tag: "Frame Composition", videoUrl: "/videos/reel-10.mp4" },
  { id: 11, title: "Work 11", tag: "Visual Story", videoUrl: "/videos/reel-11.mp4" },
  { id: 12, title: "Work 12", tag: "Editorial Cut", videoUrl: "/videos/reel-12.mp4" },
];

const VideoItem = ({
  video,
  index,
  onClick,
}: {
  video: Video;
  index: number;
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-card/40 border border-white/10 shadow-xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl hover:shadow-amber-500/10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Video Element (loads frame at t=0.1 as poster, plays on hover) */}
      <video
        ref={videoRef}
        src={`${video.videoUrl}#t=0.1`}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradients for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Number Badge Top-Left */}
      <div className="absolute top-3.5 left-3.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] tracking-wider font-mono text-white/80">
        {projectNumber}
      </div>

      {/* Play Icon in center on hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
          <Play className="w-5 h-5 fill-white translate-x-0.5" />
        </div>
      </div>

      {/* Details at Bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col gap-0.5">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400/90 font-light">
          {video.tag}
        </span>
        <h3 className="text-sm md:text-base font-medium text-foreground tracking-wide group-hover:text-amber-200 transition-colors">
          {video.title}
        </h3>
      </div>
    </div>
  );
};

const VideoGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <section id="my-works" className="w-full py-20 md:py-28 relative">
      {/* Section title on the left without categorization */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <div className="pb-6 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-2 font-mono">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-foreground">
            My works
          </h2>
        </div>
      </div>

      {/* 12 Vertical Video Works Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-6 md:px-12 lg:px-20 animate-fade-in">
        {userVideos.map((video, index) => (
          <VideoItem
            key={video.id}
            video={video}
            index={index}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default VideoGrid;
