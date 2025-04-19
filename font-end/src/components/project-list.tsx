"use client";

import { useProjects } from "@/libs/fetching-client";
import Loader from "./loader";
import ProjectCard from "./project-card";
import { useEffect, useState } from "react";
import { ProjectCardType, TypeShort } from "@/types/define.type";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DropDownBtn from "./drop-down-btn";

export default function ListProject() {
  // State
  const pageSize = 4;

  const [pageNumber, setPageNumber] = useState(1);

  const [disableShowMore, SetDisableShowMore] = useState(false);

  const [typeShort, setTypeShort] = useState<TypeShort>("project.rating");

  const [short, setShort] = useState<boolean>(true);

  const { data, error, isLoading } = useProjects(
    pageNumber,
    pageSize,
    typeShort,
    short
  );

  const [listProject, setListProject] = useState<ProjectCardType[]>([]);

  let preProsition = 4;

  // useEffect

  useEffect(() => {
    setPageNumber(1);
    setListProject([]);
  }, [short, typeShort]);

  useEffect(() => {
    handleNewList();
  }, [data]);

  // Handler
  const handleNewList = () => {
    const newLoadedProject: ProjectCardType[] | null = data || null;
    if (newLoadedProject && newLoadedProject.length > 0) {
      setListProject((preList) => [...preList, ...newLoadedProject]);
      SetDisableShowMore(false);
    } else {
      SetDisableShowMore(true);
    }
  };

  const handleShowMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleShort = (type: TypeShort) => {
    setTypeShort(type);
  };

  const handleDecreasing = (isDecresing: boolean) => {
    setShort(isDecresing);
  };

  return (
    <div>
      <div className="pb-5 flex flex-row justify-center items-center">
        <h3 className="text-nowrap">Sort By</h3>
        <DropDownBtn
          handleValue={handleShort}
          listDropDown={[
            { name: "rating", value: "project.rating" },
            { name: "Date Create", value: "project.createAt" },
            { name: "Date Update", value: "project.updateAt" },
          ]}
          name="Sort By"
        />
        <DropDownBtn
          handleValue={handleDecreasing}
          listDropDown={[
            { name: "Decreasing", value: true },
            { name: "Increasing", value: false },
          ]}
          name=""
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listProject.map((project, index) => {
          const currentPosition = preProsition === 4 ? 1 : preProsition + 1;
          preProsition = currentPosition;
          return (
            <ProjectCard
              position={currentPosition}
              project={project}
              key={index}
            />
          );
        })}
      </div>
      <div className="text-center py-3">
        <button
          disabled={disableShowMore}
          className={clsx(
            "cursor-pointer bg-border text-button-desktop px-5 py-3 rounded-xl disabled:opacity-20 border-tbnBg border-4"
          )}
          onClick={handleShowMore}
          type="button"
        >
          SHOW MORE
          <span className="ml-3">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>
    </div>
  );
}
