import { li, ul } from "framer-motion/client";
import Link from "next/link";
import { motion } from "framer-motion";
import NavDropDown from "./nav-dropdown";
import { useCategory } from "@/libs/fetching-client";
import { useEffect } from "react";

const listItem: { name: string; link: string }[] = [
  {
    link: "/",
    name: "home",
  },
  {
    link: "/about-us",
    name: "about us",
  },
  {
    link: "/contact",
    name: "contact",
  },
];

export default function ListItemMenu({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <ul className="text-hero-mobile md:text-hero-tablet h-[70vh] flex flex-col justify-around">
      {listItem.map((val, index) => {
        return (
          <motion.li
            whileHover={{ x: 20 }}
            key={index}
            transition={{ duration: 0.1, type: "tween" }}
            className="hover:text-hover duration-200"
            onClick={handleClose}
          >
            <Link href={val.link}>{val.name.toUpperCase()}</Link>
          </motion.li>
        );
      })}
      <NavDropDown handleClose={handleClose} />
    </ul>
  );
}
