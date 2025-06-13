"use client";
import { HeaderFont1 } from "@/font/font";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function TitleCarousel() {
  const variants: Variants = {
    show: {
      opacity: 1,
      visibility: "visible",
      y: [20, 0],
    },
    hide: {
      opacity: 0,
      visibility: "hidden",
      y: 20,
    },
  };

  return (
    <div className={"absolute bottom-10 left-12"}>
      <motion.h1
        variants={variants}
        initial="hide"
        whileInView="show"
        transition={{
          type: "spring",
        }}
        className={
          (HeaderFont1.className,
          "text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop")
        }
      >
        ALL SHOWCASE OF OUR TEAM PROJECT
      </motion.h1>
      <motion.h2
        variants={variants}
        initial="hide"
        whileInView="show"
        transition={{
          type: "spring",
          delay: 0.2,
        }}
        className="text-body-mobile md:text-body-tablet lg:text-body-desktop"
      >
        <Link className="hover:text-btnBg duration-200" href={"/contact"}>
          Contact with us
        </Link>
      </motion.h2>
    </div>
  );
}
