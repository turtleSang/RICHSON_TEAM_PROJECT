import DeleteProject from "@/components/delete-project";
import NotFoundComponent from "@/components/not-found-component";
import ProjectOwnerNav from "@/components/project-owner-nav";
import ProjectDetailLayout from "@/layout/project-detail";
import { ProjectDetail } from "@/types/define.type";
import axios from "axios";
import Link from "next/link";

export default async function PageDetailProject({
  params,
}: {
  params: Promise<{ projectId: number }>;
}) {
  const _params = params;

  const { projectId } = await _params;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/project/detail/${projectId}`;

  const _res = axios.get(url);
  const project: ProjectDetail = (await _res).data;

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
      <ProjectOwnerNav project={project} />
    </section>
  );
}
