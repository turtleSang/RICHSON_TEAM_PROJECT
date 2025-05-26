"use client";
import { useState } from "react";
import InputSingleImage from "./imput-single-image";
import NotificationComponent, {
  NotificationProps,
} from "./notification-component";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/layout/update-project-layout";

export default function UpdateThumbForm() {
  const { handleNofication, project } = useProjectContext();
  const router = useRouter();

  const handleUpload = async (file: File) => {
    if (!file) {
      handleNofication({ mess: "Not found Image to upload", type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/image/upload/thumb-project/${project.id}`;
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const mess = res.data as string;
      handleNofication({ mess, type: "suscess" });
      router.refresh();
    } catch (error) {
      handleNofication({ mess: "Server error", type: "error" });
    }
  };

  return (
    <div className="mt-3 p-3 bg-background-item">
      <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
        Upload Thumbnail of Project
      </h1>
      <InputSingleImage
        handleUpload={handleUpload}
        thumbId={project.thumb?.id}
      />
    </div>
  );
}
