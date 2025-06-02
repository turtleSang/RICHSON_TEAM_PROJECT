"use client";
import Loader from "@/components/loader";
import NoPermission from "@/components/no-permission";
import DashboardSkeleton from "@/components/skeleton/dashboard-skeleton";
import NavBarDashBoard from "@/layout/nav-bar-dashboard";
import { AuthContext } from "@/libs/AuthProvider";
import { useContext } from "react";

export default function LayoutDashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { error, isLoading, user } = useContext(AuthContext);
  return (
    <main className="w-full h-screen bg-background">
      {isLoading && <DashboardSkeleton />}
      {error && <NoPermission />}
      {user && (
        <div className="flex flex-row justify-between gap-1">
          <div className="w-2/12 h-[100vh] bg-background-item ">
            <NavBarDashBoard profile={user} />
          </div>
          <div className="w-10/12 max-h-screen overflow-y-auto">{children}</div>
        </div>
      )}
    </main>
  );
}
