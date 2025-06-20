"use client";
import { ContentFont } from "@/font/font";
import { TruncateTxt } from "@/libs/helper";
import { ProjectCardType } from "@/types/define.type";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard({ project }: { project: ProjectCardType }) {
  const imgUrl = project.thumb?.id
    ? `${process.env.NEXT_PUBLIC_API_URL}/image/${project.thumb.id}`
    : "/not-found.png";

  const [imgSrc, SetImgSrc] = useState(imgUrl);

  const handleImgErr = () => {
    SetImgSrc("/not-found.png");
  };

  const variants: Variants = {
    hover: {
      scale: 0.9,
    },
    hidden: {
      translateX: 10,
      translateY: 20,
      opacity: 0,
      visibility: "hidden",
    },
    show: {
      translateX: 0,
      translateY: 0,
      opacity: 1,
      visibility: "visible",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      whileHover={"hover"}
      className={clsx("overflow-hidden group col-span-1")}
    >
      <Link
        className="block relative z-0"
        href={`/project/detail/${project.id}`}
      >
        <div className="relative block z-0 w-full aspect-video overflow-hidden">
          <Image
            src={imgSrc}
            alt={`Thumbnail project ${project.name}`}
            fill
            sizes="100vw"
            onError={() => handleImgErr()}
          />
        </div>
        <div className="absolute w-full z-10 bottom-0 left-0 duration-200 md:translate-y-1/2 bg-black/30 px-3 md:group-hover:translate-y-0">
          <h2
            className={clsx(
              ContentFont.className,
              "text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktopuppercase py-3 uppercase"
            )}
          >
            {TruncateTxt(project.name, 20)}
          </h2>
          <div className="flex flex-row justify-between pb-3">
            <h3 className="flex flex-row items-center">
              <Image
                src={project.author.avatar}
                width={30}
                height={30}
                alt={`${project.author.name} avartar`}
                className="rounded-full mr-3"
              />
              <span>{project.author.name}</span>
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
