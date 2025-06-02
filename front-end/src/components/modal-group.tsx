"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

export default function ModalGroup({
  children,
  btn,
}: {
  children: React.ReactNode;
  btn: string | React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="mt-3 relative">
      <button
        onClick={handleOpen}
        type="button"
        className="bg-btnBg py-1 px-2 inline-block border-2 border-btnBorder hover:bg-hover hover:text-background cursor-pointer duration-200 rounded-md text-body-mobile md:text-body-tablet lg:text-body-desktop"
      >
        {btn}
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: "-50%" }}
              animate={{ opacity: 1, y: "0" }}
              exit={{ opacity: 0, y: "-50%" }}
              className="fixed z-20 w-3/4 bg-background-item top-1/7 left-1/2 -translate-x-1/2 rounded-md max-h-[80vh] overflow-y-auto"
            >
              <div className="w-full border-b-2 border-border text-right">
                <span className="w-12 h-12 leading-13 inline-block text-center cursor-pointer rounded-full hover:bg-gray-600">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-card-title-mobile md:text-card-title-tablet lg:text-card-title-desktop text-btnBg "
                    onClick={handleClose}
                  ></FontAwesomeIcon>
                </span>
              </div>
              <div>{children}</div>
            </motion.div>
            <motion.div
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed z-10 w-full h-screen bg-background top-0 left-0"
              onClick={handleClose}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
