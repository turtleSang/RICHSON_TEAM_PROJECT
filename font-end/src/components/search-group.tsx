"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import { motion, Variants } from "framer-motion";
import SearchForm from "./search-form";

export default function SearchGroup() {
  const [isActive, setActive] = useState(false);

  const handleActive = () => {
    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
  };

  const blurBgVariatant: Variants = {
    open: {
      opacity: 0.5,
      visibility: "visible",
    },
    close: {
      opacity: 0,
      visibility: "hidden",
    },
  };

  const formVariatant: Variants = {
    open: {
      opacity: 1,
      y: ["-270px", "20px", "0"],
      width: "70%",
      visibility: "visible",
    },
    close: {
      opacity: 0,
      y: ["20px", "-250px"],
      width: "80px",
      visibility: "hidden",
    },
  };

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(123);
  };

  return (
    <div>
      <button
        onClick={handleActive}
        type="button"
        className="cursor-pointer hover:bg-btnBorter hover:text-background duration-200 text-body-mobile md:text-body-tablet lg:text-body-desktop bg-background-item py-1 px-3 md:py-2 md:px-5 lg:py-4 lg:px-6 rounded-4xl"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} /> <span>Search</span>
      </button>
      <SearchForm isActive={isActive} />
      <motion.div
        variants={blurBgVariatant}
        animate={isActive ? "open" : "close"}
        onClick={handleClose}
        className="fixed top-0 left-0 bg-background w-full h-[100vh]"
      ></motion.div>
    </div>
  );
}
