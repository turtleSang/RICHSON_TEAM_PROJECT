"use client";
import InputMultipleImage from "./input-mutiple-image";
import axios from "axios";
import { useProjectContext } from "@/layout/update-project-layout";
import { NotificationProps } from "./notification-component";

export default function UpdateProjectImg() {
  const { handleNofication, project, handleProcess, handleUpload } =
    useProjectContext();
  const handleUploadFile = async (fileList: File[]) => {
    if (fileList.length === 0) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/image/upload/project/${project.id}`;
    const formData = new FormData();
    handleUpload(true);
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { total, loaded } = progressEvent;
          if (typeof total === "number" && total > 0) {
            const percentage = Math.round((loaded * 100) / total);
            handleProcess(percentage);
          }
        },
      });
      const newNotification: NotificationProps = {
        mess: res.data as string,
        type: "success",
      };
      handleNofication(newNotification);
    } catch (error) {
      console.error(error);
      handleNofication({
        mess: "server error",
        type: "error",
      });
    }
    handleUpload(false);
  };

  return (
    <div className="mt-3 p-3 bg-background-item">
      <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
        Upload images of Project
      </h1>
      <InputMultipleImage
        listImgId={project.imageList}
        handleUpload={handleUploadFile}
      />
    </div>
  );
}
