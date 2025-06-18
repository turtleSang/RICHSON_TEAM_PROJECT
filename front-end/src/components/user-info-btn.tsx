"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion, Variants } from "framer-motion";
import axios from "axios";

export default function UserInfoBtn({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  const [active, setActive] = useState(false);
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

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={handleActive}
      className="cursor-pointer z-0 bg-background-item relative flex flex-row items-center lg:py-1 md:pr-3 rounded-4xl"
    >
      <div className="relative w-9 md:w-11 aspect-square rounded-full overflow-hidden">
        <Image className="" src={avatar} fill alt="Avatar" />
      </div>
      <span className="hidden md:inline-block pl-3 text-caption-mobile md:text-caption-tablet lg:text-caption-desktop">
        {name}
      </span>
      <motion.ul
        variants={userMenuVariants}
        initial="close"
        animate={active ? "open" : "close"}
        className=" absolute w-15 top-0 -left-3 md:left-0 md:w-full pt-14 md:pt-10 lg:pt-13 -z-10  bg-background-item  rounded-4xl flex flex-col justify-end overflow-hidden"
      >
        <li className="text-caption-mobile md:text-caption-tablet lg:text-caption-desktop py-3 text-center md:text-start md:pl-5  hover:bg-hover hover:text-accent duration-200">
          <Link className="  w-full" href={`/profile`}>
            <span className="hidden md:inline-block">
              <FontAwesomeIcon className="pr-3" icon={faUser} />
            </span>
            <span className="">Profile</span>
          </Link>
        </li>
        <li className="text-caption-mobile md:text-caption-tablet lg:text-caption-desktop md:pl-5 py-3 hover:bg-hover hover:text-accent duration-200">
          <button
            onClick={handleLogout}
            className="md:text-start cursor-pointer inline-block w-full"
            type="button"
          >
            <span className="hidden md:inline-block">
              <FontAwesomeIcon className="pr-3" icon={faPowerOff} />
            </span>
            <span className="inline-block">Logout</span>
          </button>
        </li>
      </motion.ul>
    </div>
  );
}
