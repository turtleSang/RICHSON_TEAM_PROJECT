"use client";
import { ValidateProjectId } from "@/libs/helper";
import { ProjectDetail } from "@/types/define.type";
import {
  faDeleteLeft,
  faRemove,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { div } from "framer-motion/client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import NotFoundComponent from "@/components/not-found-component";
import ModalGroup from "@/components/modal-group";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import ProjectCardManagerSkelecton from "@/components/skeleton/project-manager-card-skeleton";

export default function PageProjectManager() {
  const [projectId, setProjectId] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectId) {
      handleNotification({ mess: "Enter Project ID", type: "warning" });
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/detail/${projectId}`;
    setIsLoading(true);
    const res = await axios.get(url);
    const projectData: ProjectDetail = res.data;
    if (projectData) {
      setProject(projectData);
    } else {
      setProject(null);
    }
    setIsLoading(false);
  };

  const handleDelte = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/admin/${id}`;
    try {
      const res = await axios.delete(url, { withCredentials: true });
      const mess = res.data as string;
      handleNotification({ mess, type: "success" });
      setProject(null);
    } catch (error) {
      handleNotification({ mess: "Server Error", type: "error" });
    }
    setTimeout(() => {
      router.refresh();
    }, 2000);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if (ValidateProjectId(val) || val === "") {
      setProjectId(val);
    }
  };

  const handleNotification = (notification: NotificationProps) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div>
      {notification && (
        <NotificationComponent
          mess={notification.mess}
          type={notification.type}
        />
      )}

      <form
        className="flex justify-center gap-3 items-center bg-background-item p-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="w-1/2" htmlFor="projectId">
          Search by Project ID
          <input
            className="mx-3 focus-visible:outline-0 w-8/12 border-b-2  focus:border-b-hover"
            placeholder="EXT: 1, 2, 3"
            id="projectId"
            name="projectId"
            onInput={(e) => handleInputChange(e)}
            value={projectId}
          />
        </label>
        <button
          type="submit"
          className="ml-3 inline-block border-2 w-20 h-10 cursor-pointer rounded-2xl bg-background-item hover:bg-hover hover:text-black hover:border-hover duration-200"
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {isLoading ? (
        <ProjectCardManagerSkelecton />
      ) : project ? (
        <div className="bg-background-item mt-3 px-3 py-9 flex flex-row flex-wrap justify-around items-center relative">
          <h1>Name: {project.name}</h1>
          <p>Description: {project.description}</p>
          <h3 className="flex flex-row items-center">
            <Image
              src={project.author.avatar}
              width={30}
              height={30}
              alt={`${project.author.name} avartar`}
              className="rounded-full mr-3"
            />
            <span>Author: {project.author.name}</span>
          </h3>
          {isDelete && (
            <div className="bg-black/50 w-full absolute top-0 left-0 text-center flex justify-center">
              <Loader />
            </div>
          )}
          <ModalGroup
            btn={
              <div className="w-1/2">
                <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
              </div>
            }
          >
            <div className="text-center text-section-title-mobile md:text-section-title-mobile lg:text-section-title-desktop">
              Delete Project {project.name}
            </div>
            <div className="border-t-2 border-border p-3 text-center">
              <button
                className=" py-2 px-4 cursor-pointer rounded-md bg-red-600 hover:bg-red-400 duration-200"
                type="button"
                onClick={() => handleDelte(project.id)}
              >
                Delete
              </button>
            </div>
          </ModalGroup>
        </div>
      ) : (
        <NotFoundComponent name="Not Found Project" />
      )}
    </div>
  );
}
