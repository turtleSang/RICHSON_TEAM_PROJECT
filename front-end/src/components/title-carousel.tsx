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
    <div className={"absolute top-1/2 left-1/2 -translate-1/2 text-center"}>
      <motion.h1
        variants={variants}
        initial="hide"
        whileInView="show"
        transition={{
          type: "spring",
        }}
        className={
          (HeaderFont1.className,
          "text-nowrap text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop")
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
        className="text-body-mobile md:text-body-tablet lg:text-body-desktop mt-3 uppercase"
      >
        <Link
          className="inline-block px-3 py-2 cursor-pointer bg-hover text-background duration-200 rounded-lg hover:text-text"
          href={"/contact"}
        >
          Contact with us
        </Link>
      </motion.h2>
    </div>
  );
}
