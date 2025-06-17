"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ListImgProject({
  listImg,
}: {
  listImg: { id: number }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [chossenImg, setChossenImg] = useState<string>("");
  const listUrlImg = listImg.map(
    (val) => `${process.env.NEXT_PUBLIC_API_URL}/image/${val.id}`
  );

  const sliderList = (): SlideImage[] => {
    let list: SlideImage[] = listUrlImg
      .filter((val) => val != chossenImg)
      .map((val) => {
        const slide: SlideImage = { src: val };
        return slide;
      });

    return [{ src: chossenImg }, ...list];
  };

  return (
    <div className="w-10/12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3">
      {listUrlImg.map((val, index) => {
        return (
          <div
            className="relative aspect-video cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setChossenImg(val);
            }}
            key={index}
          >
            <Image
              src={val}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 25vw"
              alt="Image of Project"
            />
          </div>
        );
      })}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={sliderList()}
        plugins={[Thumbnails]}
      />
    </div>
  );
}
