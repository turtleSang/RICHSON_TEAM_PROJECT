"use client";
import { FileWithPath } from "react-dropzone";
import InputMultipleImage from "./input-mutiple-image";
import axios from "axios";
import { useProjectContext } from "@/layout/update-project-layout";
import { NotificationProps } from "./notification-component";

export default function UpdateProjectImg() {
  const { handleNofication, project } = useProjectContext();
  const handleUpload = async (fileList: File[]) => {
    if (fileList.length === 0) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/image/upload/project/${project.id}`;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newNotification: NotificationProps = {
        mess: res.data as string,
        type: "suscess",
      };
      handleNofication(newNotification);
    } catch (error) {
      handleNofication({
        mess: "server error",
        type: "error",
      });
    }
  };

  return (
    <div className="mt-3 p-3 bg-background-item">
      <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
        Upload images of Project
      </h1>
      <InputMultipleImage
        listImgId={project.imageList}
        handleUpload={handleUpload}
      />
    </div>
  );
}
