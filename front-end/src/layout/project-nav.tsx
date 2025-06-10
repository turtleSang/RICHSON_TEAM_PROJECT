"use client";
import NotFoundComponent from "@/components/not-found-component";
import VideoBackGround from "@/components/video-background";
import { useCategory } from "@/libs/fetching-client";
import { CategoryType } from "@/types/define.type";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectNav() {
  const { data, error, isLoading } = useCategory();
  const { category } = useParams<{ category: string }>();
  const [activeTab, setActiveTab] = useState<CategoryType | null>(null);

  useEffect(() => {
    if (data) {
      const categoryChossen = data.find((val, index) => {
        return val.link === category;
      });
      if (categoryChossen) {
        setActiveTab(categoryChossen);
      }
    }
  }, [category, data]);

  const handleActiveTab = (category: CategoryType) => {
    setActiveTab(category);
  };

  const backgroundVariants: Variants = {
    show: { opacity: 1 },
    hiden: { opacity: 0 },
  };

  return (
    <div className="relative py-28 flex flex-row flex-wrap items-center justify-around w-full h-full px-8 md:px-10 lg:px-20 overflow-hidden">
      {data ? (
        data.map((category, index) => {
          return (
            <div
              className="relative cursor-pointer  rounded-md text-center overflow-hidden "
              key={category.id}
              onClick={() => handleActiveTab(category)}
            >
              <Link
                className="block h-full border-2  px-3 py-2  border-border rounded-md"
                href={`/project/${category.link}`}
              >
                {category.name}
              </Link>

              {activeTab?.link === category.link && (
                <motion.div
                  layoutId="box"
                  className="absolute -z-10 top-0 left-0 w-full h-full bg-border"
                ></motion.div>
              )}
            </div>
          );
        })
      ) : (
        <NotFoundComponent name="Category" />
      )}
      <div className="-z-20 w-full bg-btnBg/50 aspect-video opacity-40 absolute">
        <AnimatePresence mode="wait">
          {data &&
            data.map((val, index) => {
              return (
                <motion.div
                  variants={backgroundVariants}
                  animate={activeTab?.id === val.id ? "show" : "hiden"}
                  key={index}
                  className="absolute top-0 left-0 w-full"
                >
                  <BackGroundItem category={val} />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

const BackGroundItem = ({ category }: { category: CategoryType }) => {
  if (category.videoThumb?.id) {
    return (
      <VideoBackGround
        src={`${process.env.NEXT_PUBLIC_API_URL}/video/stream/${category.videoThumb.id}`}
      />
    );
  }

  return;
};
