"use client";
import "plyr-react/plyr.css";
import dynamic from "next/dynamic";
import NotFoundComponent from "./not-found-component";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export default function VideoPlayer({
  videoId,
  thumbId,
}: {
  videoId?: number;
  thumbId?: number;
}) {
  const srcInfo: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        src: `${process.env.NEXT_PUBLIC_API_URL}/video/stream/${videoId}`,
        type: "video/mp4",
        size: 800,
      },
    ],
    poster: thumbId
      ? `${process.env.NEXT_PUBLIC_API_URL}/image/${thumbId}`
      : undefined,
  };

  return (
    <div className="w-10/12 mx-auto">
      {videoId ? <Plyr source={srcInfo} /> : <NotFoundComponent name="video" />}
    </div>
  );
}
