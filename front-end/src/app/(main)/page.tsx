import Carousel from "@/components/carousel";
import ListProject from "@/components/project-list";
import AboutUsHome from "@/layout/about-us-home";
import GroupCategory from "@/layout/group-category";
import ListProjectLayOut from "@/layout/list-project-layout";

export default async function MainPage() {
  return (
    <div>
      <Carousel />
      <AboutUsHome />
      <GroupCategory />
      <ListProjectLayOut name="Project HighLight" />
    </div>
  );
}
