"use client";

import { useProjects } from "@/libs/fetching-client";
import { ProjectCardType, TypeShort } from "@/types/define.type";
import ListProjectSkeleton from "./skeleton/list-project-skeleton";
import ProjectCard from "./project-card";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import NotFoundComponent from "./not-found-component";
import clsx from "clsx";

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

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useProjects(
    pageNumber,
    pageSize,
    typeShort,
    short,
    { userId, categoryLink }
  );
  const [listProject, setListProject] = useState<ProjectCardType[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);

  useEffect(() => {
    setListProject([]);
    setPageNumber(1);
  }, [typeShort, short]);

  useEffect(() => {
    console.log(data);

    if (data && data.maxPage) {
      if (data.maxPage > pageNumber) {
        setCanShowMore(true);
      } else {
        setCanShowMore(false);
      }
    }

    if (data && data.listProject && data.listProject.length > 0) {
      setListProject((pre) => {
        return [...pre, ...data.listProject];
      });
    }
  }, [data]);

  const handleShowMore = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <>
      {isLoading && <ListProjectSkeleton />}
      <div className="w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {listProject.length > 0 ? (
          listProject.map((val, index) => {
            return <ProjectCard project={val} key={`${val.id}-${index}`} />;
          })
        ) : (
          <div className="col-span-full flex items-center justify-center w-full h-full">
            <NotFoundComponent name="project" />
          </div>
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
