"use client";
import useScrollY from "@/libs/scroll-state";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import ListItemMenu from "./list-menu-nav";

export default function NavMenu() {
  const [active, setActive] = useState(false);

  const buttonVariant: Variants = {
    open: { opacity: 1 },
    close: { opacity: 0 },
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

  const handleClose = () => {
    setActive(false);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        type="button"
        className="text-section-title-mobile md:text-section-title-mobile lg:text-section-title-desktop sticky z-40 cursor-pointer overflow-hidden "
        layout
      >
        <AnimatePresence>
          {active ? (
            <motion.span
              className="inline-block"
              key={"close-icon"}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
            >
              <FontAwesomeIcon icon={faClose} />
            </motion.span>
          ) : (
            <motion.span
              className="inline-block"
              key={"open-icon"}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
            >
              <FontAwesomeIcon icon={faBars} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <motion.div
        className="bg-background-item fixed top-0 right-0 h-screen overflow-y-auto overflow-x-hidden z-30 rounded-l-2xl pl-10 pt-10 md:pt-14 lg:pt-20  w-4/5 md:w-3/5 lg:w-2/5 "
        initial="close"
        variants={menuVariant}
        animate={active ? "open" : "close"}
      >
        <ListItemMenu handleClose={handleClose} />
      </motion.div>
      <motion.div
        variants={menuBackgroundVariant}
        initial="close"
        onClick={handleClick}
        animate={active ? "open" : "close"}
        className="bg-background opacity-65 w-[100vw] h-[100vh] fixed top-0 left-0 z-10"
      ></motion.div>
    </>
  );
}
