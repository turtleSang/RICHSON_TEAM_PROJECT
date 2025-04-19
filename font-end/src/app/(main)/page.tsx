import Carousel from "@/components/carousel";
import ListProject from "@/components/project-list";
import GroupCategory from "@/layout/group-category";
import GroupProject from "@/layout/group-project";

export default async function MainPage() {
  return (
    <div>
      <Carousel />
      <GroupCategory />
      <GroupProject />
    </div>
  );
}
