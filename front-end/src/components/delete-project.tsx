"use client";
import { ProjectDetail } from "@/types/define.type";
import ModalGroup from "./modal-group";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import NotificationComponent, {
  NotificationProps,
} from "./notification-component";
import Loader from "./loader";

export default function DeleteProject({ project }: { project: ProjectDetail }) {
  const router = useRouter();
  const [notifitcation, setNotification] = useState<NotificationProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/${project.id}`;
    setIsLoading(true);
    try {
      const res = await axios.delete(url, { withCredentials: true });
      const data = res.data as string;
      setNotification({
        mess: data,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
        router.replace("/project");
      }, 2000);
    } catch (error) {
      setNotification({
        mess: "Server error",
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      {notifitcation && (
        <NotificationComponent
          mess={notifitcation.mess}
          type={notifitcation.type}
        />
      )}
      <ModalGroup btn={"Delete Project"}>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Delete Project</h2>
          <p className="mb-6">
            Are you sure you want to delete the project{" "}
            <span className="font-semibold">{project.name}</span>?
          </p>
          <div className="flex justify-center gap-4 border-t-2 border-hover p-3 w-full">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              onClick={async () => await handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </ModalGroup>
    </>
  );
}
