"use client";

import { HeaderFont3 } from "@/font/font";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

const listParagraph: string[] = [
  `Richson's journey in the world of visual arts is a testament to his early dedication and passion. Starting out as a editor at a young age, Richson quickly gained valuable experience that shaped his future in the industry. Collaborating with well-known artists like Son Tung MTP, Phuong Ly, Min, Phuong My Chi,... gave a deeper insight into the power of creativity and helped Richson realize that his aspirations extended far beyond editing. This experience likely ignited his desire to pursue more ambitious and innovative projects, pushing him to explore the artistic world in a broader, more profound way.`,
  `With over 10 years of experience in editing and having worked on a wide range of projects across Viet Nam, Richson understands that creativity alone doesn't define a project. Therefore, Richson turned to directing, driven by the desire to convey carefully crafted concepts that combine music, visuals, and storytelling, allowing the audience to fully appreciate and enjoy the art.`,
  `Richson has earned the trust of major brands such as Vinfast, Acnes, VIB, Acecook, M.O.I, Sneaker Buzz, iZOTA, Be and L'Officiel.`,
];

const listProcess: {
  content: string;
  linkImg: string;
}[] = [
  {
    content: "Music MV",
    linkImg: "/about-us/1.jpg",
  },
  {
    content: "Visuals",
    linkImg: "/about-us/2.jpg",
  },
  {
    content: "Storytelling",
    linkImg: "/about-us/3.jpg",
  },
];

export default function PageAboutUs() {
  return (
    <div
      className={clsx(
        HeaderFont3.className,
        "px-10 text-body-mobile md:text-body-tablet lg:text-body-desktop py-5"
      )}
    >
      {listParagraph.map((txt, index) => {
        return (
          <motion.p
            initial={{
              opacity: 0,
              translateY: 50,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            transition={{
              type: "spring",
              duration: 0.5,
              delay: index * 0.5,
            }}
            className="w-5/6 md:w-4/5 lg:w-3/4 mx-auto"
            key={index}
          >
            {txt}
          </motion.p>
        );
      })}
      <TimelineLine />
      <div className="grid grid-cols-3 gap-3">
        {listProcess.map((val, index) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: [1.2, 1],
              }}
              transition={{
                duration: 0.5,
              }}
              key={index}
            >
              <div className="relative aspect-video ">
                <Image fill alt="process richson" src={val.linkImg} />
              </div>
              <h3 className="text-center">{val.content}</h3>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const TimelineLine = () => (
  <svg
    width="100%"
    height="80"
    viewBox="0 0 800 80"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-3"
  >
    {/* Line */}
    <motion.line
      initial={{
        pathLength: 0,
      }}
      animate={{
        pathLength: 1,
      }}
      transition={{
        duration: 2,
      }}
      x1="50"
      y1="40"
      x2="750"
      y2="40"
      stroke="#00ffe0"
      strokeWidth="3"
      className="draw-line"
    />

    {/* Year labels */}
    <text
      x="50"
      y="65"
      className="fill-text text-title-mobile md:text-title-tablet lg:text-title-desktop"
    >
      2015
    </text>
    <text
      x="750"
      y="65"
      className="fill-text text-title-mobile md:text-title-tablet lg:text-title-desktop"
    >
      Now
    </text>
  </svg>
);
