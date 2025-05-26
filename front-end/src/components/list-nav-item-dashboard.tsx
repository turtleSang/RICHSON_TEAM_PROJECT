"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const listNavItem = ["", "category", "project", "user", "carousel"];
export default function ListNavDashBoard() {
  const [activeNav, setActiveNav] = useState<string>("");

  const handleActiveNav = (nav: string) => {
    setActiveNav(nav);
  };

  useEffect(() => {
    const path = window.location.pathname.split("/");
    if (path[2]) {
      setActiveNav(path[2]);
    } else {
      setActiveNav("");
    }
  }, []);

  return (
    <motion.div className="w-full mt-10">
      {listNavItem.map((val, index) => {
        return (
          <motion.div className="relative block h-20" key={index}>
            {activeNav === val && (
              <motion.div
                className="top-0 left-0 z-0 absolute w-full h-full bg-hover"
                layoutId="box"
              ></motion.div>
            )}
            <Link
              className={clsx(
                "absolute block z-20 w-full py-3 px-5 uppercase top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                activeNav === val ? "text-background" : "text-text"
              )}
              href={`/dashboard/${val}`}
              onClick={() => handleActiveNav(val)}
            >
              {val ? val : "dashboard"}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
