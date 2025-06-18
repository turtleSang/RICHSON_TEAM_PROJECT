"use client";
import InputSingleImage from "./imput-single-image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/layout/update-project-layout";

export default function UpdateThumbForm() {
  const { handleNofication, project, handleProcess, handleUpload } =
    useProjectContext();
  const router = useRouter();

  const handleUploadFile = async (file: File) => {
    if (!file) {
      handleNofication({ mess: "Not found Image to upload", type: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/image/upload/thumb-project/${project.id}`;
    handleUpload(true);
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
      const mess = res.data as string;
      handleNofication({ mess, type: "success" });
      router.refresh();
    } catch (error) {
      console.error(error);
      handleNofication({ mess: "Server error", type: "error" });
    }
    handleUpload(false);
  };

  return (
    <div className="mt-3 p-3 bg-background-item">
      <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
        Upload Thumbnail of Project
      </h1>
      <InputSingleImage
        handleUpload={handleUploadFile}
        thumbId={project.thumb?.id}
      />
    </div>
  );
}
