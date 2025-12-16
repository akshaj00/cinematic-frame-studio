import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 animate-fade-in-slow"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close video"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Video container */}
      <div
        className="relative w-full max-w-6xl mx-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          autoPlay
          className="w-full aspect-video bg-secondary"
        />
      </div>
    </div>
  );
};

export default VideoModal;
