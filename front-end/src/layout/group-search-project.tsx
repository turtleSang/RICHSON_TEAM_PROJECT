import ProjectCard from "@/components/project-card";
import { ProjectCardType } from "@/types/define.type";
import axios from "axios";

export default async function GroupSearchProject({
  keyword,
}: {
  keyword: string;
}) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/project/name/${keyword}`
    );

    const listCard: ProjectCardType[] = res.data;
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {listCard.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-2xl font-bold">
        No project found for keyword {decodeURI(keyword)}
      </div>
    );
  }
}
