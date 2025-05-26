import CreateProjectForm from "@/components/create-project-form";
import ModalGroup from "@/components/modal-group";
import { HeaderFont2 } from "@/font/font";
import { UserProfile } from "@/types/define.type";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export default function ProfileNavLayout({
  profile,
}: {
  profile: UserProfile;
}) {
  return (
    <div
      className={clsx(
        "flex  items-center justify-around mt-3",
        HeaderFont2.className
      )}
    >
      <h1 className="text-2xl font-bold">Hi {profile.name}</h1>
      <ModalGroup
        btn={
          <span>
            <FontAwesomeIcon icon={faAdd} /> <span>Add Project</span>
          </span>
        }
      >
        <CreateProjectForm />
      </ModalGroup>
    </div>
  );
}
