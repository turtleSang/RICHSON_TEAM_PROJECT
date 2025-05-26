"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { read } from "fs";
import { motion, Variants } from "framer-motion";

export default function VideoBackGround({ src }: { src: string }) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const variants: Variants = {
    show: {
      opacity: 1,
      y: 0,
      visibility: "visible",
    },
    hidden: {
      opacity: 0,
      y: 50,
      visibility: "hidden",
    },
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayHandler = () => setReady(true);
    const waitingHandler = () => setReady(false);

    video.addEventListener("canplay", canPlayHandler);
    video.addEventListener("waiting", waitingHandler);

    return () => {
      video.removeEventListener("canplay", canPlayHandler);
      video.removeEventListener("waiting", waitingHandler);
    };
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      className="relative min-h-64"
      transition={{
        delay: 0.5,
      }}
    >
      <video className="w-full h-auto z-30" autoPlay loop muted ref={videoRef}>
        <source src={src} type="video/mp4" />
      </video>
      {!ready && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2">
          <Loader />
        </div>
      )}
    </motion.div>
  );
}
