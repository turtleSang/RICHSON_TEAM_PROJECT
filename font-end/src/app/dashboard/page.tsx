import { GetProfileServer } from "@/libs/fetching-server";
import { cookies } from "next/headers";

export default async function PageDashBoard() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("access_token");
  if (!token) {
    return <div>Require login</div>;
  }
  const user: { name: string; email: string } = await GetProfileServer(
    token.value
  );
  if (!user) {
    return <div>Require login</div>;
  }

  return <div>{token.value}</div>;
}
