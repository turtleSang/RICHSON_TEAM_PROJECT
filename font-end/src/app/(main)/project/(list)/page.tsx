import ListProject from "@/components/project-list";
import ListProjectLayOut from "@/layout/list-project-layout";

export default function ProjectPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <ListProjectLayOut name="All Project" />
    </div>
  );
}
