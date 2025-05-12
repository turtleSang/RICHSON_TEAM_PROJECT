"use client";
import Link from "next/link";
import { AnimatePresence, motion, Variant, Variants } from "framer-motion";
import DropDownBtn from "./drop-down-nav-btn";
import { useState } from "react";
import clsx from "clsx";
import { useCategory } from "@/libs/fetching-client";
import Loader from "./loader";

export default function NavDropDown({
  handleClose,
}: {
  handleClose: () => void;
}) {
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
          <Link onClick={handleClose} href={"/project"}>
            {"project".toLocaleUpperCase()}
          </Link>
          <DropDownBtn active={active} onClick={handleActive} />
        </div>
      </li>
      <motion.div>
        <AnimatePresence>
          {active && (
            <motion.ul
              layoutId="CategoryGroup"
              variants={variants}
              initial={"close"}
              animate={"open"}
              exit={"close"}
              transition={{ duration: 0.3 }}
              className="pl-3 lg:rounded-lg"
              layout
            >
              {isLoading && <Loader />}
              {data &&
                data.map((category) => {
                  return (
                    <motion.li key={category.id}>
                      <Link
                        href={`/project/${category.link}`}
                        className="hover:text-hover duration-200 uppercase"
                        onClick={handleClose}
                      >
                        {category.name}
                      </Link>
                    </motion.li>
                  );
                })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
