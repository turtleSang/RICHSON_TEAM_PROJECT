import Carousel from "@/components/carousel";
import AboutUsHome from "@/layout/about-us-home";
import ContactHome from "@/layout/contact-home";
import GroupCategory from "@/layout/group-category";
import ListProjectLayOut from "@/layout/list-project-layout";

export default async function MainPage() {
  return (
    <div>
      <Carousel />
      <GroupCategory />
      <ListProjectLayOut name="Project HighLight" />
      <AboutUsHome />
      <ContactHome />
    </div>
  );
}
