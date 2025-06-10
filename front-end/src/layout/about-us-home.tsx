"use client";
import TitleSection from "@/components/title-section";
import { HeaderFont1, HeaderFont3 } from "@/font/font";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsHome() {
  return (
    <div className="mt-10">
      <TitleSection title="About Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
        <motion.div
          initial={{
            translateX: "-100%",
          }}
          whileInView={{
            translateX: 0,
          }}
          transition={{ delay: 0.5 }}
        >
          <div className="aspect-video relative rounded-md overflow-hidden">
            <Image
              alt="RICHSON PARTNER"
              src={"/partner.png"}
              fill
              sizes="100vw"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{
            translateX: "100%",
          }}
          whileInView={{
            translateX: 0,
          }}
          transition={{ delay: 0.5 }}
        >
          <p
            className={clsx(
              HeaderFont3.className,
              "w-11/12 text-justify mx-auto mt-5 text-body-mobile md:mt-0 md:text-body-tablet lg:text-body-desktop"
            )}
          >
            Richson is a creative team with a strong foundation in visual
            storytelling, beginning their journey in the industry through video
            editing at a young age. Over the years, the team has built extensive
            experience by working with some of Vietnam’s top artists, including
            Son Tung M-TP, Phuong Ly, Min, and Phuong My Chi. These
            collaborations offered valuable insight into the power of visuals
            and sound, inspiring the team to expand their focus beyond editing
            into broader, more ambitious creative directions.
          </p>
          <Link href={"/about-us"}>
            <button
              className={clsx(
                HeaderFont1.className,
                "uppercase text-textsc cursor-pointer relative block mx-auto mt-10 after:duration-200 after:-bottom-1 after:z-30 after:left-0 after:absolute after:h-0.5 after:w-0 after:bg-btnBg hover:after:w-full hover:text-btnBg "
              )}
            >
              Read more
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
