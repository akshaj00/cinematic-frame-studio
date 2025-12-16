import { useRef, useState, useEffect } from "react";
import VideoModal from "./VideoModal";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Mountain Expedition",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    title: "Urban Stories",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    title: "Ocean Dreams",
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    title: "Desert Winds",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    title: "Northern Lights",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 6,
    title: "City Lights",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
];

const VideoItem = ({ video, onClick }: { video: Video; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
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

  return (
    <div
      ref={containerRef}
      className={`video-item aspect-video cursor-pointer transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      
      {/* Subtle overlay on hover */}
      <div
        className={`absolute inset-0 bg-background/10 transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

const VideoGrid = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <section className="w-full py-24 md:py-32">
      {/* Section title */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-foreground">
          WORK
        </h2>
      </div>

      {/* Video grid - edge to edge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            video={video}
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
