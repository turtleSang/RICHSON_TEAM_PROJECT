"use client";
import InputVideoFile from "@/components/input-single-videos";
import NotFoundComponent from "@/components/not-found-component";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import ProcessBar from "@/components/process-bar";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function CarouselPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(
    `${process.env.NEXT_PUBLIC_API_URL}/video/carousel`
  );
  const [processPercent, setProcessPercent] = useState(15);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [activeUploadForm, setActiveUploadForm] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) {
      handleNotification({ mess: "No file selected", type: "error" });
      return;
    }
    setIsUploading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/video/upload/carousel`;
    const formData = new FormData();
    formData.append("file", file);
    setVideoUrl(null);
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 100;
          const loaded = progressEvent.loaded || 0;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProcessPercent(percentCompleted);
        },
      });
      const mess = res.data as string;
      setVideoUrl(URL.createObjectURL(file));
      handleNotification({ mess, type: "success" });
    } catch (error) {
      setVideoUrl(`${process.env.NEXT_PUBLIC_API_URL}/video/carousel`);
      handleNotification({ mess: "Server Error", type: "success" });
    }
    setIsUploading(false);
    handleActiveUploadForm(false);
  };

  const handleNotification = (notification: NotificationProps) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleActiveUploadForm = (isActive: boolean) => {
    setActiveUploadForm(isActive);
  };

  return (
    <div>
      <div>
        <button
          className="bg-btnBg block w-2/3 mx-auto my-3 p-3 rounded-md cursor-pointer hover:bg-hover duration-300 text-3xl"
          onClick={() => handleActiveUploadForm(!activeUploadForm)}
        >
          <FontAwesomeIcon icon={activeUploadForm ? faClose : faUpload} />
        </button>
        {activeUploadForm && <InputVideoFile handleUpload={handleUpload} />}
      </div>
      {notification && (
        <NotificationComponent
          mess={notification.mess}
          type={notification.type}
        />
      )}
      {videoUrl ? (
        <div>
          <video
            className="w-2/3 mx-auto"
            muted
            controls
            onError={() => setVideoUrl(null)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ) : (
        <NotFoundComponent name="Background Carousel" />
      )}

      {isUploading && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-black/50 z-50">
          <ProcessBar percentage={processPercent} />
        </div>
      )}
    </div>
  );
}
