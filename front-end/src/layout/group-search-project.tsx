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

    let prePosition = 4;

    const listCard: ProjectCardType[] = res.data;
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {listCard.map((project, index) => {
          const currentPosition = prePosition === 4 ? 1 : prePosition + 1;
          prePosition = currentPosition;
          return (
            <ProjectCard
              project={project}
              key={project.id}
              position={currentPosition}
            />
          );
        })}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-2xl font-bold">
        No project found for keyword '{decodeURI(keyword)}'
      </div>
    );
  }
}
