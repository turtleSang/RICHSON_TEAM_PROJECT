import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { FormEvent } from "react";

export default function SearchForm({ isActive }: { isActive: boolean }) {
  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <motion.form
      variants={formVariatant}
      initial="close"
      animate={isActive ? "open" : "close"}
      className="text-hero-mobile lg:text-hero-tablet fixed top-64 left-1/2 -translate-x-1/2 z-30"
      onSubmit={handleForm}
    >
      <label className="flex flex-row justify-between py-3 px-4 bg-background-item rounded-4xl">
        <input
          className="w-2/3 focus-visible:outline-0"
          type="text"
          placeholder="Search videos"
        />
        <button className="cursor-pointer pr-3" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </label>
    </motion.form>
  );
}
