import ListImgProject from "@/components/list-img-project";
import NotFoundComponent from "@/components/not-found-component";
import TitleSection from "@/components/title-section";
import VideoPlayer from "@/components/video-player";
import { HeaderFont2 } from "@/font/font";
import { ProjectDetail } from "@/types/define.type";
import clsx from "clsx";

export default function ProjectDetailLayout({
  project,
}: {
  project: ProjectDetail;
}) {
  const createAt: Date = new Date(project.createAt);

  return (
    <>
      <VideoPlayer videoId={project.video?.id} thumbId={project.thumb?.id} />
      <div
        className={clsx(
          "mt-3 mb-10 px-8 md:px-10 lg:px-20 text-justify text-body-mobile md:text-body-tablet lg:text-body-desktop",
          HeaderFont2.className
        )}
      >
        <h1 className="text-section-title-tablet md:text-section-title-tablet lg:text-section-title-desktop">
          {project.name}
        </h1>
        <p className="text-caption-mobile">
          Date Create {createAt.toLocaleDateString("vi-VN")}
        </p>
        {project.description}
      </div>
      {project.imageList && project.imageList.length > 0 ? (
        <ListImgProject listImg={project.imageList} />
      ) : (
        <NotFoundComponent name="Images" />
      )}
    </>
  );
}
