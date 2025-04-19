import ListProject from "@/components/project-list";
import TitleSection from "@/components/title-section";

export default function GroupProject() {
  const title = "Project highlight";

  return (
    <section className="">
      <TitleSection title={title} />
      <ListProject />
    </section>
  );
}
