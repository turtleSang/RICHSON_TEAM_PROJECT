import { CategoryType } from "@/types/define.type";
import { useEffect, useState } from "react";
import NotFoundComponent from "./not-found-component";
import NotificationComponent, {
  NotificationProps,
} from "./notification-component";
import DeleteBtn from "./delete-btn";
import axios, { AxiosError } from "axios";
import ProcessBar from "./process-bar";
import Loader from "./loader";

export default function CategoryDashboardCard({
  category,
}: {
  category: CategoryType;
}) {
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [percentageUpload, setPercentageUpload] = useState<number>(0);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (category.videoThumb?.id) {
      setUrlVideo(
        `${process.env.NEXT_PUBLIC_API_URL}/video/stream/${category.videoThumb.id}`
      );
    }
  }, []);

  useEffect(() => {
    if (fileUpload) {
      setUrlVideo(URL.createObjectURL(fileUpload));
    } else if (category.videoThumb?.id) {
      setUrlVideo(
        `${process.env.NEXT_PUBLIC_API_URL}/video/stream/${category.videoThumb.id}`
      );
    } else {
      setUrlVideo(null);
    }
  }, [fileUpload]);

  const handleNotification = (newNotification: NotificationProps) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      handleNotification({
        mess: "File is not valid",
        type: "error",
      });
      return;
    }
    if (file.type !== "video/mp4") {
      handleNotification({
        mess: "File must be mp4",
        type: "error",
      });
      return;
    }
    if (file.size > 102400000) {
      handleNotification({
        mess: "Category video must be smaller than 100MB",
        type: "error",
      });
      return;
    }
    setFileUpload(file);
    setUrlVideo(null);
  };

  const handleDeleteUpload = () => {
    setUrlVideo(null);
    setFileUpload(null);
  };

  const handleUploadFile = async () => {
    if (!fileUpload) {
      handleNotification({
        mess: "File is not valid",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", fileUpload);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/video/upload/category/${category.id}`;
    setIsUpload(true);
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / (total || 1));
          setPercentageUpload(percentage);
        },
      });
      const mess = res.data as string;
      handleNotification({
        mess: mess,
        type: "success",
      });
      setFileUpload(null);
    } catch (error) {
      const err = error as AxiosError;
      handleNotification({ mess: err.message, type: "error" });
    }

    setIsUpload(false);
  };

  const handleDeleteCategory = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category/${category.id}`;
    setLoader(true);
    try {
      const res = await axios.delete(url, { withCredentials: true });
      const mess = res.data as string;
      handleNotification({
        mess: mess,
        type: "success",
      });
    } catch (error) {
      const err = error as AxiosError;
      handleNotification({ mess: err.message, type: "error" });
    }
    setLoader(false);
  };

  return (
    <div className="bg-background-item p-3 relative">
      {notification && (
        <NotificationComponent
          mess={notification.mess}
          type={notification.type}
        />
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="w-1/2">
          <h1 className="uppercase text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktop">
            {category.name}
          </h1>
          <h1 className="text-caption-mobile md:text-caption-tablet lg:text-caption-desktop">
            LINK:{" "}
            <span className="text-textsc text-body-mobile md:text-body-tablet lg:text-body-desktop">
              {category.link}
            </span>
          </h1>

          <p className="text-body-mobile md:text-body-tablet lg:text-body-desktop text-textsc">
            {category.description}
          </p>
        </div>
        <DeleteBtn
          mess={`Delete Category ${category.name}`}
          handleDelete={() => handleDeleteCategory()}
        />
      </div>
      {urlVideo ? (
        <video controls className="w-full h-auto">
          <source src={urlVideo} type="video/mp4" />
        </video>
      ) : (
        <NotFoundComponent name="Category Videos" />
      )}
      <div className="mt-3 text-center">
        {isUpload ? (
          <ProcessBar percentage={percentageUpload} />
        ) : (
          <div>
            {fileUpload ? (
              <>
                <button
                  className="inline-block cursor-pointer p-3 rounded-md duration-200 hover:bg-hover bg-btnBg mr-5 "
                  onClick={handleUploadFile}
                >
                  Upload
                </button>
                <button
                  className="inline-block cursor-pointer p-3 rounded-md duration-200 hover:bg-hover bg-red-600"
                  onClick={handleDeleteUpload}
                >
                  Delete
                </button>
              </>
            ) : (
              <label
                className="border-2 p-3 inline-block cursor-pointer"
                htmlFor={`${category.id}-input`}
              >
                <span>Chossen File</span>
                <input
                  type="file"
                  placeholder=""
                  className="hidden"
                  multiple={false}
                  id={`${category.id}-input`}
                  onChange={(e) => handleChangeFile(e)}
                />
              </label>
            )}
          </div>
        )}
      </div>
      {loader && (
        <div className="absolute top-0 left-0 w-full h-full bg-background opacity-50 z-20 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
