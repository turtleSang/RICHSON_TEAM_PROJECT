import LayoutUpdateProject from "@/layout/update-project-layout";
import { ProjectDetail } from "@/types/define.type";
import axios from "axios";

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
