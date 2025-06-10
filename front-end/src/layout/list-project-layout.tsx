"use client";

import DropDownBtn from "@/components/drop-down-btn";
import ListProject from "@/components/project-list";
import TitleSection from "@/components/title-section";
import { HeaderFont1 } from "@/font/font";
import { TypeShort } from "@/types/define.type";
import clsx from "clsx";
import { p } from "framer-motion/client";
import { useState } from "react";

export default function ListProjectLayOut({
  name,
  description,
  categoryLink,
  userId,
}: {
  name: string;
  description?: string;
  userId?: number;
  categoryLink?: string;
}) {
  const [typeShort, setTypeShort] = useState<TypeShort>("project.rating");
  const [short, setShort] = useState<boolean>(true);
  const handleShort = (type: TypeShort) => {
    setTypeShort(type);
  };
  const handleDecreasing = (isDecresing: boolean) => {
    setShort(isDecresing);
  };

  return (
    <div className="mt-10 w-full">
      <TitleSection title={name} />
      {description && (
        <p className="mb-5 md:mb-7 lg:mb-10 text-center capitalize">
          {description}
        </p>
      )}
      <div className="pb-5 flex flex-row justify-center items-center ">
        <h3 className="text-nowrap">Sort By</h3>
        <DropDownBtn
          handleValue={handleShort}
          listDropDown={[
            { name: "rating", value: "project.rating" },
            { name: "Date Create", value: "project.createAt" },
            { name: "Date Update", value: "project.updateAt" },
          ]}
          name="Sort By"
        />
        <DropDownBtn
          handleValue={handleDecreasing}
          listDropDown={[
            { name: "Decreasing", value: true },
            { name: "Increasing", value: false },
          ]}
          name=""
        />
      </div>
      <ListProject
        short={short}
        typeShort={typeShort}
        categoryLink={categoryLink}
        userId={userId}
      />
    </div>
  );
}
