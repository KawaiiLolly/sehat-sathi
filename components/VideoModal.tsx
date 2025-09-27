import { useEffect, useRef } from "react";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

export const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  title,
  className,
  autoPlay = false,
}: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Reset video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-modal-overlay backdrop-blur-sm",
        "animate-in fade-in-0 duration-300",
        className
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "video-modal-title" : undefined}
    >
      <div className="relative w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300 ease-out">
        {/* Modal Content */}
        <div className="relative bg-modal-background border border-modal-border rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-modal-border">
            {title && (
              <h2 id="video-modal-title" className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className={cn(
                "ml-auto flex items-center justify-center w-8 h-8",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-hover-overlay rounded-full",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-focus-ring"
              )}
              aria-label="Close video modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay={autoPlay}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={(e) => {
                console.error("Video failed to load:", e);
              }}
            >
              Your browser does not support the video tag.
            </video>

            {/* Loading/Error States */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Play size={48} className="text-white/80" />
            </div>
          </div>

          {/* Optional Footer */}
          <div className="p-4 border-t border-modal-border bg-modal-background/50">
            <p className="text-sm text-muted-foreground text-center">
              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">ESC</kbd> or click outside to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;