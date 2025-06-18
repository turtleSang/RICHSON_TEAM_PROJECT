"use client";

import ProjectCard from "@/components/project-card";
import TitleSection from "@/components/title-section";
import { HeaderFont1 } from "@/font/font";
import { useProjects } from "@/libs/fetching-client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ListProjectHighlight() {
  const { data, error, isLoading } = useProjects(
    1,
    4,
    "project.rating",
    true,
    {}
  );
  return (
    <section className="mt-10">
      <TitleSection title="Project Highlight" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data?.listProject &&
          data.listProject.map((val, index) => {
            return <ProjectCard project={val} key={`${val.id}-${index}`} />;
          })}
      </div>
      <div className="text-center text-body-mobile md:text-body-tablet lg:text-body-desktop mt-3">
        <Link href={"/about-us"}>
          <button
            className={clsx(
              HeaderFont1.className,
              "uppercase text-textsc cursor-pointer relative block mx-auto mt-10 after:duration-200 after:-bottom-1 after:z-30 after:left-0 after:absolute after:h-0.5 after:w-0 after:bg-hover hover:after:w-full hover:text-hover "
            )}
          >
            SEE ALL
            <motion.span
              className="ml-3 inline-block"
              animate={{
                x: [-5, 0, 5],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </motion.span>
          </button>
        </Link>
      </div>
    </section>
  );
}
