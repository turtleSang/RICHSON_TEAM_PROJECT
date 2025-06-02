"use client";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import ProcessBar from "@/components/process-bar";
import UpdateProjectFormBase from "@/components/update-project-form";
import UpdateProjectImg from "@/components/update-project-img";
import UpdateProjectVideo from "@/components/update-project-video";
import UpdateThumbForm from "@/components/update-thumb-image";
import { ProjectDetail } from "@/types/define.type";
import { createContext, useContext, useState } from "react";

export const ProjectContext = createContext<{
  project: ProjectDetail;
  handleNofication: (nofiticationNew: NotificationProps) => void;
  handleUpload: (isUpload: boolean) => void;
  handleProcess: (percentage: number) => void;
} | null>(null);

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
}

export default function LayoutUpdateProject({
  project,
}: {
  project: ProjectDetail;
}) {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const handleNofication = (nofiticationNew: NotificationProps) => {
    setNotification(nofiticationNew);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [percentageUpload, setPercentageUpload] = useState<number>(0);

  const handleUpload = (isUpload: boolean) => {
    setIsUpload(isUpload);
  };

  const handleProcess = (percentage: number) => {
    setPercentageUpload(percentage);
  };

  return (
    <section className="mt-3 ">
      {isUpload && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50">
          <ProcessBar percentage={percentageUpload} />
        </div>
      )}
      <ProjectContext
        value={{ handleNofication, project, handleProcess, handleUpload }}
      >
        {notification && (
          <NotificationComponent
            mess={notification.mess}
            type={notification.type}
          />
        )}
        <UpdateProjectFormBase />
        <UpdateProjectVideo />
        <UpdateThumbForm />
        <UpdateProjectImg />
      </ProjectContext>
    </section>
  );
}
