import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

export default function DropDownNavBtn({
  active,
  ...props
}: { active: boolean } & HTMLAttributes<HTMLButtonElement>) {
  const arrowVariant = {
    open: {
      rotate: 180,
    },
    close: {
      rotate: 0,
    },
  };

  return (
    <button
      type="button"
      className={clsx(
        active ? "bg-hover" : "bg-btnBg",
        " hover:bg-hover duration-200 cursor-pointer px-5 py-0.5 rounded-md"
      )}
      {...props}
    >
      <motion.span
        className="inline-block"
        variants={arrowVariant}
        animate={active ? "open" : "close"}
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </motion.span>
    </button>
  );
}
