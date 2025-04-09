"use client";

import { useEffect, useState } from "react";
import Login from "./login-with-google";
import useSWR from "swr";
import { fetcherProfile } from "@/libs/fetching-client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion, Variants } from "framer-motion";

export default function UserInfoBtn() {
  const [token, setToken] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const { data, isLoading, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, token] : null,
    ([url, token]) => fetcherProfile(url, token)
  );
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) setToken(jwtToken);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <Login />;

  const { name, avatar, id } = data;

  const userMenuVariants: Variants = {
    open: {
      scaleY: 1,
      scaleX: 1,
      visibility: "visible",
      opacity: 1,
    },
    close: {
      scaleY: 0,
      scaleX: 0,
      visibility: "hidden",
      opacity: 0,
    },
  };

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <div
      onClick={handleActive}
      className="cursor-pointer -z-10 bg-background-item relative flex flex-row items-center md:py-1 md:pr-3 rounded-4xl"
    >
      <Image
        className="rounded-full"
        src={avatar}
        width={50}
        height={50}
        alt="Avatar"
      />
      <span className="hidden md:inline-block pl-3">{name}</span>
      <motion.ul
        variants={userMenuVariants}
        initial="close"
        animate={active ? "open" : "close"}
        className=" absolute w-20 -left-4 md:left-0 md:w-full -z-10 top-0 bg-background-item pt-16 rounded-4xl flex flex-col justify-end overflow-hidden"
      >
        <li className="text-center md:text-start pl-5 pb-3 hover:bg-hover hover:text-accent duration-200">
          <Link className="  w-full" href={`/profile`}>
            <FontAwesomeIcon className="pr-3" icon={faUser} />
            <span className="hidden md:inline-block">Profile</span>
          </Link>
        </li>
        <li className="pl-5 pb-3 hover:bg-hover hover:text-accent duration-200">
          <button
            className="md:text-start cursor-pointer inline-block w-full"
            type="button"
          >
            <FontAwesomeIcon className="pr-3" icon={faPowerOff} />
            <span className="hidden md:inline-block">Log out</span>
          </button>
        </li>
      </motion.ul>
    </div>
  );
}
