import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="search-layout">
      <main className="search-content">{children}</main>
    </div>
  );
}
