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
  videoId: number;
}) {
  return (
    <Link className="rounded-4xl overflow-hidden" href={`/project/${link}`}>
      <div className="h-52 relative">
        <div className="w-full h-auto z-10 absolute top-1/2 -translate-y-1/2">
          <VideoBackGround
            src={`${process.env.NEXT_PUBLIC_API_URL}/video/stream/${videoId}`}
          />
        </div>
        <h1
          className={clsx(
            HeaderFont2.className,
            "absolute z-20 left-1/2 top-1/2 -translate-1/2 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop"
          )}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
}
