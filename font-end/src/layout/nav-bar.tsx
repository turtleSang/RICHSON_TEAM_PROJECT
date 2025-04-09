"use client";
import Login from "@/components/login-with-google";
import Logo from "@/components/nav-logo";
import NavMenu from "@/components/nav-menu";
import SearchGroup from "@/components/search-group";
import UserInfoBtn from "@/components/user-info-btn";
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
        "border-2 border-border py-2 fixed top-0 left-0 w-full duration-200 shadow-lg shadow-border flex justify-around items-center",
        active ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Logo />
      <SearchGroup />
      <UserInfoBtn />
      <NavMenu />
    </nav>
  );
}
