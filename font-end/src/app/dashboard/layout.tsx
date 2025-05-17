import NoPermission from "@/components/no-permission";
import NavBarDashBoard from "@/layout/nav-bar-dashboard";
import { GetProfileServer } from "@/libs/fetching-server";
import { cookies } from "next/headers";

export default async function LayoutDashBoard({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("access_token");
  if (!token) {
    return <NoPermission />;
  }
  const profile = await GetProfileServer(token.value);
  if (!profile) {
    return <NoPermission />;
  }

  return (
    <section className="flex flex-row justify-between gap-1">
      <div className="w-2/12 h-[100vh] bg-background-item">
        <NavBarDashBoard profile={profile} />
      </div>
      <div className="w-10/12 h-[100vh] overflow-y-auto">{children}</div>
    </section>
  );
}
