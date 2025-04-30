import { GetProfileServer } from "@/libs/fetching-server";
import { cookies } from "next/headers";

export default async function LayoutDashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
