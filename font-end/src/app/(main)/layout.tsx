import NavBar from "@/layout/nav-bar";
import React from "react";

export default function LayoutMainPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar></NavBar>
      {children}
    </main>
  );
}
