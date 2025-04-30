"use client";
import Link from "next/link";
import { motion, Variant, Variants } from "framer-motion";
import DropDownBtn from "./drop-down-nav-btn";
import { useState } from "react";
import clsx from "clsx";
import { useCategory } from "@/libs/fetching-client";
import Loader from "./loader";

export default function NavDropDown() {
  const { data, error, isLoading } = useCategory();

  const [active, setActive] = useState(false);

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
        {isLoading && <Loader />}
        {data &&
          data.map((category) => {
            return (
              <motion.li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="hover:text-hover duration-200 uppercase"
                >
                  {category.name}
                </Link>
              </motion.li>
            );
          })}
      </motion.ul>
    </>
  );
}
