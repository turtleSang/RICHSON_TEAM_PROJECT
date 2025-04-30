"use client";
import useScrollY from "@/libs/scroll-state";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import ListItemMenu from "./list-menu-nav";

export default function NavMenu() {
  const [active, setActive] = useState(false);

  const buttonVariant = {
    open: { y: "-50%" },
    close: { y: 0 },
  };

  const menuVariant = {
    open: { x: 0 },
    close: { x: "105%" },
  };

  const menuBackgroundVariant = {
    open: {
      display: "block",
    },
    close: {
      display: "none",
    },
  };

  function handleClick() {
    setActive(!active);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="top-5 sticky z-40 cursor-pointer overflow-hidden w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12"
      >
        <motion.span
          className="inline-block"
          variants={buttonVariant}
          initial="close"
          animate={active ? "open" : "close"}
        >
          <FontAwesomeIcon
            className="text-hero-mobile md:text-hero-tablet lg:text-hero-desktop"
            icon={faBars}
          />
          <br />
          <FontAwesomeIcon
            className="text-hero-mobile md:text-hero-tablet lg:text-hero-desktop"
            icon={faClose}
          />
        </motion.span>
      </button>
      <motion.div
        className="bg-background-item fixed top-0 right-0 h-screen overflow-y-auto overflow-x-hidden z-30 rounded-l-2xl pl-10 pt-10 md:pt-14 lg:pt-20  w-4/5 md:w-3/5 lg:w-2/5 "
        initial="close"
        variants={menuVariant}
        animate={active ? "open" : "close"}
      >
        <ListItemMenu />
      </motion.div>
      <motion.div
        variants={menuBackgroundVariant}
        initial="close"
        onClick={handleClick}
        animate={active ? "open" : "close"}
        className="bg-background opacity-65 w-[100vw] h-[100vh] fixed top-0 left-0 z-10"
      ></motion.div>
    </div>
  );
}
