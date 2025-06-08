import DeleteProject from "@/components/delete-project";
import NotFoundComponent from "@/components/not-found-component";
import ProjectDetailLayout from "@/layout/project-detail";
import { GetProfileServer } from "@/libs/fetching-server";
import { ProjectDetail } from "@/types/define.type";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function PageDetailProject({
  params,
}: {
  params: Promise<{ projectId: number }>;
}) {
  let profile: any;
  const _cookie = cookies();
  const _params = params;

  const { projectId } = await _params;
  const cookieStorage = await _cookie;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/project/detail/${projectId}`;

  const token = cookieStorage.get("access_token")?.value;
  const _profile = GetProfileServer(token);

  const _res = axios.get(url);
  const project: ProjectDetail = (await _res).data;
  profile = await _profile;

  if (!project) {
    return <NotFoundComponent name={"Project"} />;
  }

  return (
    <section className="mt-5">
      {project ? (
        <>
          <ProjectDetailLayout project={project} />
        </>
      ) : (
        <NotFoundComponent name="project" />
      )}
      {profile && profile.id === project.author.id && (
        <div className="text-center flex flex-row justify-around items-center my-5">
          <Link
            className=" py-1 px-2 inline-block border-2 border-btnBorder hover:bg-hover hover:text-background cursor-pointer duration-200 rounded-md text-body-mobile md:text-body-tablet lg:text-body-desktop"
            href={`./${projectId}/update`}
          >
            Update Project
          </Link>
          <DeleteProject project={project} />
        </div>
      )}
    </section>
  );
}
