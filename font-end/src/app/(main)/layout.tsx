import NavBar from "@/layout/nav-bar";
import React from "react";

export default function LayoutMainPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-16 lg:pt-24">
      <NavBar></NavBar>
      {children}
    </main>
  );
}
