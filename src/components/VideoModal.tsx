import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface Video {
  id: number;
  title: string;
  tag?: string;
  videoUrl: string;
}

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

const VideoModal = ({ video, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [video]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in-slow p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200 border border-white/10 shadow-lg"
        aria-label="Close video"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video container (tailored for vertical reel player) */}
      <div
        className="relative w-full max-w-sm sm:max-w-md max-h-[88vh] aspect-[9/16] animate-scale-in rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain bg-black"
        />
      </div>
    </div>
  );
};

export default VideoModal;
