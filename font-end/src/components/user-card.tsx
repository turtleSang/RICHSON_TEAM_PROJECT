import { Role, UserProfile } from "@/types/define.type";
import { faCheck, faClose, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { NotificationProps } from "./notification-component";
import axios, { AxiosError } from "axios";

const listRole: Role[] = ["admin", "viewer", "member"];

export default function UserCard({
  profile,
  handleNotification,
  handleUpdated,
}: {
  profile: UserProfile;
  handleNotification: (newNotification: NotificationProps) => void;
  handleUpdated: (userId: number, newRole: Role) => void;
}) {
  const [roleSelect, setRoleSelect] = useState<Role>(profile.role);
  const createAt = new Date(profile.createAt);
  const [dissableBtn, setDissableBtn] = useState(false);

  const [isOpen, setOpen] = useState(false);

  const handleRoleSelect = (newRole: Role) => {
    setRoleSelect(newRole);
  };

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const handleUpdateRole = async () => {
    if (roleSelect === profile.role) {
      handleNotification({
        mess: `Please chossen new Role for ${profile.name} `,
        type: "error",
      });
      return;
    }
    const userUpgrade: { newRole: Role } = {
      newRole: roleSelect,
    };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/upgrade/${[
      profile.id,
    ]}`;
    try {
      const res = await axios.put(url, userUpgrade, { withCredentials: true });
      const mess: string = res.data;
      handleNotification({ mess, type: "suscess" });
      handleOpen(false);
      handleUpdated(profile.id, roleSelect);
    } catch (error) {
      const axiosErr = error as AxiosError;
      handleNotification({ mess: axiosErr.message, type: "error" });
    }
  };

  return (
    <motion.div className="w-full  p-3 rounded-md mb-3 bg-accent" layout>
      <div className="flex flex-row justify-between items-center">
        <Image
          className="rounded-full inline-block w-28"
          src={profile.avatar}
          width={112}
          height={112}
          alt="avatar"
        />
        <div className="ml-3 w-1/3">
          <h2 className="text-text text-card-title-desktop">{profile.name}</h2>
          <p className="text-hover text-card-title-mobile">{profile.role}</p>
          <p className="text-textsc">{profile.email}</p>
          <p className="text-btnBg">
            Register date: {createAt.toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="w-1/3 flex flex-row justify-around">
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key={`${profile.id}Nav`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="inline-block mr-3 w-10 h-10 text-2xl hover:bg-background-item text-green-600 cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed"
                  disabled={roleSelect === profile.role || dissableBtn}
                  onClick={async () => {
                    setDissableBtn(true);
                    await handleUpdateRole();
                    setDissableBtn(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={() => handleOpen(false)}
                  type="button"
                  className="inline-block w-10 h-10 text-2xl hover:bg-background-item text-red-600 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleOpen(true)}
                className="border-2 p-3 rounded-md bg-btnBg text-background hover:bg-hover duration-200 cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="ml-3">Update Role</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`${profile.id}-select-role`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 pt-3 flex flex-row flex-wrap justify-around border-t-2 border-t-background-item"
          >
            {listRole.map((val, index) => {
              return (
                <div
                  className="uppercase relative z-10 p-3 cursor-pointer"
                  key={`${profile.id}-${val}`}
                  onClick={() => handleRoleSelect(val)}
                >
                  <div className="z-auto"> {val}</div>
                  {roleSelect === val && (
                    <motion.div
                      layoutId={`${profile.id}-box`}
                      className="absolute bg-btnBg w-full h-full top-0 left-0 -z-10 rounded-md"
                    ></motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
