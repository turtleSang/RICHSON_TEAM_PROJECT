"use client";
import VideoBackGround from "@/components/video-background";
import { useCategory } from "@/libs/fetching-client";
import { CategoryType } from "@/types/define.type";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectNav() {
  const { data, error, isLoading } = useCategory();
  const { category } = useParams<{ category: string }>();
  const [activeTab, setActiveTab] = useState<string | null>(category);

  return (
    <div className="mb-10 flex flex-row flex-wrap items-center justify-around w-full h-full  px-8 md:px-10 lg:px-20">
      {data &&
        data.map((category, index) => {
          return (
            <div
              className="relative cursor-pointer  rounded-md text-center overflow-hidden "
              key={category.id}
              onClick={() => setActiveTab(category.link)}
            >
              <Link
                className="block h-full border-2  px-3 py-2  border-border rounded-md"
                href={`/project/${category.link}`}
              >
                {category.name}
              </Link>

              {activeTab === category.link && (
                <motion.div
                  layoutId="box"
                  className="absolute -z-10 top-0 left-0 w-full h-full bg-border"
                ></motion.div>
              )}
            </div>
          );
        })}
    </div>
  );
}
