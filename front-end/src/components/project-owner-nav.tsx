"use client";

import Link from "next/link";
import DeleteProject from "./delete-project";
import { ProjectDetail } from "@/types/define.type";
import { useProfile } from "@/libs/fetching-client";
import { useContext } from "react";
import { AuthContext } from "@/libs/AuthProvider";

export default function ProjectOwnerNav({
  project,
}: {
  project: ProjectDetail;
}) {
  const { error, isLoading, user } = useContext(AuthContext);

  return (
    <>
      {user && user.id === project.author.id && (
        <div className="text-center flex flex-row justify-around items-center my-5">
          <Link
            className=" py-1 px-2 inline-block border-2 border-btnBorder hover:bg-hover hover:text-background cursor-pointer duration-200 rounded-md text-body-mobile md:text-body-tablet lg:text-body-desktop"
            href={`./${project.id}/update`}
          >
            Update Project
          </Link>
          <DeleteProject project={project} />
        </div>
      )}
    </>
  );
}
