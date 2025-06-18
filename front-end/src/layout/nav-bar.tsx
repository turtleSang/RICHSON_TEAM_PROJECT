"use client";
import ProfileInfo from "@/components/profile-infomation";
import Logo from "@/components/nav-logo";
import NavMenu from "@/components/nav-menu";
import SearchGroup from "@/components/search-group";
import useScrollY from "@/libs/scroll-state";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function NavBar() {
  const y = useScrollY();
  const [preScroll, setPreSroll] = useState<number>(0);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    if (preScroll >= y) {
      setActive(true);
    } else {
      setActive(false);
    }
    setPreSroll(y);
  }, [y]);

  return (
    <nav
      className={clsx(
        "border-2 bg-background border-shadow-nav py-2 fixed z-50 top-0 left-0 w-full duration-200 shadow-lg shadow-shadow-nav flex justify-between items-center px-3 md:px-5 lg:px-10",
        active ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Logo />
      <div className="flex flex-row w-1/4 md:w-4/12 lg:w-3/12 justify-between items-center">
        <SearchGroup />
        <ProfileInfo />
        <NavMenu />
      </div>
    </nav>
  );
}
