"use client";
import { HeaderFont1 } from "@/font/font";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

export default function TitleSection({ title }: { title: string }) {
  const variants: Variants = {
    open: {
      opacity: 1,
      visibility: "visible",
      y: 0,
    },
    close: {
      opacity: 0,
      visibility: "hidden",
      y: 200,
    },
  };

  return (
    <div>
      <motion.h1
        variants={variants}
        initial="close"
        animate="open"
        transition={{ duration: 0.5 }}
        className={clsx(
          HeaderFont1.className,
          "mb-2 md:mb-4 text-center uppercase text-hero-mobile md:text-hero-tablet lg:text-hero-desktop "
        )}
      >
        {title}
      </motion.h1>
    </div>
  );
}
