"use client";
import { HeaderFont1 } from "@/font/font";
import { TruncateTxt } from "@/libs/helper";
import { UserProfile } from "@/types/define.type";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfileDashBoard({
  profile,
}: {
  profile: UserProfile;
}) {
  const router = useRouter();
  const handleClick = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => router.replace("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col items-center">
      <Image
        className="rounded-full block "
        src={profile.avatar}
        alt="avartar"
        width={50}
        height={50}
      />
      <span className={clsx(HeaderFont1.className)}>
        {TruncateTxt(profile.name, 20)}
      </span>
      <span>{profile.role}</span>
      <button
        type="button"
        className="block py-2 px-6 border-2 cursor-pointer duration-200 hover:text-background hover:bg-btnBorder hover:border-btnBorder rounded-xl"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPowerOff} />
        <span className="block">Log out</span>
      </button>
    </div>
  );
}
