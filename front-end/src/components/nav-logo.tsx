"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { HeaderFont1 } from "@/font/font";

export default function Logo() {
  return (
    <h1
      className={clsx(
        HeaderFont1.className,
        "sm:text-section-title-mobile md:text-section-title--mobile lg:text-section-title-desktop"
      )}
    >
      <Link className="drop-shadow-sm drop-shadow-text" href={"/"}>
        <motion.span
          className="inline-block"
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{ type: "spring", delay: 0.25 }}
        >
          RICHSON
        </motion.span>
        <motion.span
          className="inline-block"
          initial={{ x: 50, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{ type: "tween", delay: 0.5 }}
        >
          .
        </motion.span>
        <motion.span
          className="inline-block"
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{ type: "tween", delay: 0.75 }}
        >
          TEAM
        </motion.span>
      </Link>
    </h1>
  );
}
