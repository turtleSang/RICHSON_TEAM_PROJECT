import NotFoundComponent from "@/components/not-found-component";
import ProjectDetailLayout from "@/layout/project-detail";
import { GetProfileServer } from "@/libs/fetching-server";
import { ProjectDetail, UserProfile } from "@/types/define.type";
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
        <div className="text-center">
          <Link
            className="inline-block cursor-pointer border-2 p-5 rounded-md hover:border-border hover:text-hover duration-200"
            href={`./${projectId}/update`}
          >
            Update Project
          </Link>
        </div>
      )}
    </section>
  );
}
