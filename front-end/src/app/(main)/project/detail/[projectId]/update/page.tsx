import NoPermission from "@/components/no-permission";
import LayoutUpdateProject from "@/layout/update-project-layout";
import { GetProfileServer } from "@/libs/fetching-server";
import { ProjectDetail } from "@/types/define.type";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UpdateProjectPage({
  params,
}: {
  params: Promise<{ projectId: number }>;
}) {
  const projectId = (await params).projectId;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/project/detail/${projectId}`;
  const project: ProjectDetail = (await axios.get(url)).data;

  return (
    <section>
      <LayoutUpdateProject project={project} />
    </section>
  );
}
