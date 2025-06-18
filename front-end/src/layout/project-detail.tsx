import DescriptionDetail from "@/components/description-detail";
import ListImgProject from "@/components/list-img-project";
import NotFoundComponent from "@/components/not-found-component";
import VideoPlayer from "@/components/video-player";
import { HeaderFont2 } from "@/font/font";
import { FormatRenderDescription } from "@/libs/helper";
import { ProjectDetail } from "@/types/define.type";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export default function ProjectDetailLayout({
  project,
}: {
  project: ProjectDetail;
}) {
  const createAt: Date = new Date(project.createAt);
  const listText = FormatRenderDescription(project.description);
  const rate = Math.floor(project.rating / 2);
  const halfStar = project.rating % 2 > 0 ? true : false;

  const arrStar = new Array(rate).fill("");

  return (
    <>
      <VideoPlayer videoId={project.video?.id} thumbId={project.thumb?.id} />
      <div
        className={clsx(
          "mt-3 w-11/12 mb-5 mx-auto text-justify text-body-mobile md:text-body-tablet lg:text-body-desktop",
          HeaderFont2.className
        )}
      >
        <div className=" flex flex-row justify-between items-center">
          <h1 className="text-section-title-tablet md:text-section-title-tablet lg:text-section-title-desktop">
            {project.name}
          </h1>
          <div className="text-right">
            <span className="text-btnBg text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktop">
              {arrStar.map((_, index) => {
                return <FontAwesomeIcon icon={faStar} key={index} />;
              })}
              {halfStar && <FontAwesomeIcon icon={faStarHalf} />}
            </span>
          </div>
        </div>
        <DescriptionDetail listText={listText} />
      </div>
      <div className="w-11/12 mx-auto">
        <h4
          className={clsx(
            " text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktop",
            HeaderFont2.className
          )}
        >
          Project Images
        </h4>
        {project.imageList && project.imageList.length > 0 ? (
          <ListImgProject listImg={project.imageList} />
        ) : (
          <NotFoundComponent name="Images" />
        )}
      </div>
    </>
  );
}
