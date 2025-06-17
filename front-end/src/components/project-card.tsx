"use client";
import { ContentFont } from "@/font/font";
import { TruncateTxt } from "@/libs/helper";
import { ProjectCardType } from "@/types/define.type";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard({
  project,
  position,
}: {
  project: ProjectCardType;
  position: number;
}) {
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
      translateX: 20,
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
      <Link className="relative z-0" href={`/project/detail/${project.id}`}>
        <div className="relative block z-0 w-full aspect-video overflow-hidden">
          <Image
            src={imgSrc}
            alt={`Thumbnail project ${project.name}`}
            fill
            sizes="100vw"
            onError={() => handleImgErr()}
          />
        </div>
        <div className="absolute w-11/12 z-10 bottom-0 left-3 duration-200 md:translate-y-3/4 bg-black/50 px-3 rounded-t-xl md:group-hover:translate-y-0">
          <h2
            className={clsx(
              ContentFont.className,
              "text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktopuppercase py-3 uppercase"
            )}
          >
            {TruncateTxt(project.name, 20)}
          </h2>
          <p className="hidden md:block py-1 text-body-mobile md:text-body-tablet lg:text-body-desktop">
            {TruncateTxt(project.description, 30)}
          </p>
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
          <div className="flex flex-row flex-wrap justify-start gap-3 py-3 items-center ">
            {project.categoryList.map((category) => {
              return (
                <div
                  className="ml-2 text-black text-body-mobile text-nowrap bg-hover py-1 px-2 rounded-2xl"
                  key={`${project.id}-${category.id}`}
                >
                  <span>{category.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
