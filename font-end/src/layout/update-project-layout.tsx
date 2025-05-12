"use client";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import UpdateProjectFormBase from "@/components/update-project-form";
import UpdateProjectImg from "@/components/update-project-img";
import UpdateProjectVideo from "@/components/update-project-video";
import UpdateThumbForm from "@/components/update-thumb-image";
import { ProjectDetail } from "@/types/define.type";
import { createContext, useContext, useState } from "react";

export const ProjectContext = createContext<{
  project: ProjectDetail;
  handleNofication: (nofiticationNew: NotificationProps) => void;
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

  return (
    <section className="mt-3 ">
      <ProjectContext value={{ handleNofication, project }}>
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
