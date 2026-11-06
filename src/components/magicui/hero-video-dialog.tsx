// Magic UI Hero Video Dialog, MIT License: https://github.com/magicuidesign/magicui
// Adapted to the site's shadcn Dialog for focus trapping, Escape, and labelling.
"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ContentImage } from "@/components/content/content-image";

type HeroVideoDialogProps = {
  videoSrc: string;
  thumbnailSrc: string;
  /** Video title: names the play button, thumbnail, dialog, and player. */
  title: string;
  className?: string;
};

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  title,
  className,
}: HeroVideoDialogProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("hero-video", className)}>
      <button
        type="button"
        className="hero-video-trigger"
        aria-label={`Play video: ${title}`}
        onClick={() => setOpen(true)}
      >
        <ContentImage src={thumbnailSrc} alt="" sizes="(max-width: 768px) 100vw, 1120px" />
        <span className="hero-video-play" aria-hidden="true">
          <span>
            <Play />
          </span>
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="content-video-dialog" closeLabel="Close video">
              <DialogTitle className="content-sr-only">{title}</DialogTitle>
              <DialogDescription className="content-sr-only">
                Press Escape to close the video.
              </DialogDescription>
              <motion.div
                className="content-video-frame"
                initial={reducedMotion ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <iframe
                  src={videoSrc}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
