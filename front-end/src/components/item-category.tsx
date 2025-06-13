"use client";
import Link from "next/link";
import VideoBackGround from "./video-background";
import clsx from "clsx";
import { HeaderFont2 } from "@/font/font";

export default function ItemCategory({
  id,
  name,
  link,
  videoId,
}: {
  id: number;
  name: string;
  link: string;
  videoId: number | null;
}) {
  return (
    <Link className="w-full overflow-hidden" href={`/project/${link}`}>
      <div className="h-52 relative -z-10">
        <div className="w-full aspect-video h-auto z-10 absolute top-1/2 -translate-y-1/2 bg-btnBg">
          {videoId && (
            <VideoBackGround
              src={`${process.env.NEXT_PUBLIC_API_URL}/video/stream/${videoId}`}
            />
          )}
        </div>
        <h1
          className={clsx(
            HeaderFont2.className,
            "absolute z-10 left-1/2 top-1/2 uppercase -translate-1/2 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop"
          )}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
}
