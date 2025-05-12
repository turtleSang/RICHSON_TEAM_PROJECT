"use client";

import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import InputVideoFile from "./input-single-videos";
import { useRouter } from "next/navigation";
import NotFoundComponent from "./not-found-component";
import axios from "axios";
import NotificationComonent, {
  NotificationProps,
} from "./notification-component";
import { useProjectContext } from "@/layout/update-project-layout";

export default function UpdateProjectVideo() {
  const { project, handleNofication } = useProjectContext();
  const router = useRouter();
  const [isActive, setActive] = useState(false);

  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleClose = () => {
    setActive(false);
  };
  const handleOpen = () => {
    setActive(true);
  };

  const handleUpload = async (file: File) => {
    if (!file) {
      handleNofication({ mess: "Not Found Video to upload", type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/video/upload/project/${project.id}`;
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const nofication: NotificationProps = {
        mess: res.data as string,
        type: "suscess",
      };
      handleNofication(nofication);
      handleClose();
    } catch (error) {
      handleNofication({ mess: "server error", type: "error" });
    }
  };

  useEffect(() => {
    if (project.video) {
      const timestamp = Date.now();
      setVideoUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/video/stream/${project.video.id}?t=${timestamp}`
      );
    }
  }, [project]);

  return (
    <div className="mt-3 bg-background-item text-right p-3">
      <div>
        {videoUrl && project.video?.id ? (
          <video className="w-full" controls>
            <source src={videoUrl} />
          </video>
        ) : (
          <NotFoundComponent name={"Video of Project"} />
        )}
      </div>
      <motion.div
        className="flex flex-row justify-between items-center mt-3"
        layout
      >
        <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
          Upload Video Project
        </h1>
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.span
              key={"close"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
            >
              <FontAwesomeIcon
                className="text-section-title-mobile p-3 md:text-section-title-tablet lg:text-section-title-desktop rounded-full hover:text-btnBg cursor-pointer duration-200 "
                icon={faClose}
              />
            </motion.span>
          ) : (
            <motion.span
              key="upload"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleOpen}
            >
              <FontAwesomeIcon
                className="inline-block bg-btnBg p-3 rounded-md text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop cursor-pointer hover:bg-hover duration-200 "
                icon={faUpload}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div className="mt-3" layout>
        {isActive && <InputVideoFile handleUpload={handleUpload} />}
      </motion.div>
    </div>
  );
}
