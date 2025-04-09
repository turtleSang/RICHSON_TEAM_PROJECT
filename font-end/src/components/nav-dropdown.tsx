"use client";
import Link from "next/link";
import { motion, Variant, Variants } from "framer-motion";
import DropDownBtn from "./arrow-down-btn";
import { useState } from "react";
import clsx from "clsx";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { audio } from "framer-motion/client";

export default function NavDropDown() {
  // const data = await fetch("http://localhost:3000/api/category/all");

  // const categoryList: {
  //   id: number;
  //   name: string;
  //   link: string;
  // }[] = await data.json();

  const [active, setActive] = useState(false);

  const categoryList = [
    { id: 1, name: "short", link: "short" },
    { id: 2, name: "tvc", link: "tvc" },
    { id: 3, name: "mv", link: "mv" },
  ];

  const handleActive = () => {
    setActive(!active);
  };

  const variants: Variants = {
    open: {
      height: "auto",
      visibility: "visible",
    },
    close: {
      height: 0,
      visibility: "hidden",
    },
  };

  return (
    <>
      <li
        className={clsx(
          active ? "bg-hover text-background" : "bg-transparent",
          "duration-200 relative rounded-md overflow-hidden"
        )}
      >
        <div className="flex flex-row justify-between">
          <Link href={"/category"}>{"project".toLocaleUpperCase()}</Link>
          <DropDownBtn active={active} onClick={handleActive} />
        </div>
      </li>
      <motion.ul
        variants={variants}
        animate={active ? "open" : "close"}
        className="pl-3 lg:rounded-lg"
      >
        {categoryList.map((val) => {
          return (
            <motion.li whileHover={{ x: 20 }} key={val.id}>
              <Link
                className="hover:text-hover duration-200"
                href={`category/${val.link}`}
              >
                {val.name}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </>
  );
}
