"use client";

import { getListProject, useProjects } from "@/libs/fetching-client";
import { ProjectCardType, TypeShort } from "@/types/define.type";
import ListProjectSkeleton from "./skeleton/list-project-skeleton";
import ProjectCard from "./project-card";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import NotFoundComponent from "./not-found-component";
import clsx from "clsx";
import { div } from "framer-motion/client";

export default function ListProject({
  short,
  typeShort,
  userId,
  categoryLink,
}: {
  typeShort: TypeShort;
  short: boolean;
  userId?: number;
  categoryLink?: string;
}) {
  const pageSize = 4;
  let preProjectPositon = 4;
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useProjects(
    pageNumber,
    pageSize,
    typeShort,
    short,
    { userId, categoryLink }
  );
  const [listProject, setListProject] = useState<ProjectCardType[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(true);

  useEffect(() => {
    setListProject([]);
    setPageNumber(1);
  }, [typeShort, short]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setCanShowMore(false);
      return;
    }
    if (data) {
      setListProject((pre) => {
        return [...pre, ...data];
      });
      setCanShowMore(true);
    }
  }, [data]);

  const handleShowMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <>
      {isLoading && <ListProjectSkeleton />}
      <div className="w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {listProject ? (
          listProject.map((val) => {
            const positon = preProjectPositon === 4 ? 1 : preProjectPositon + 1;
            preProjectPositon = positon;
            return (
              <ProjectCard project={val} position={positon} key={val.id} />
            );
          })
        ) : (
          <NotFoundComponent name="project" />
        )}
      </div>

      {canShowMore && (
        <div
          className={clsx(
            "flex flex-col items-center py-3 hover:text-btnBg cursor-pointer"
          )}
          onClick={handleShowMore}
        >
          <h3>Show more</h3>
          <motion.span
            animate={{ opacity: [0, 1, 0], translateY: [-10, 0, 10] }}
            transition={{
              repeat: Infinity,
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </motion.span>
        </div>
      )}
    </>
  );
}
