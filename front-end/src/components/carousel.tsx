import TitleCarousel from "./title-carousel";
import VideoBackGround from "./video-background";

export default function Carousel() {
  return (
    <div className="px-2 py-1">
      <div className="h-[20vh] md:h-[50vh] lg:h-[70vh] overflow-hidden relative rounded-3xl">
        <div className="absolute w-full -z-20 top-1/2 -translate-y-1/2">
          <VideoBackGround
            src={`${process.env.NEXT_PUBLIC_API_URL}/video/carousel`}
          />
        </div>
        <TitleCarousel />
      </div>
    </div>
  );
}
