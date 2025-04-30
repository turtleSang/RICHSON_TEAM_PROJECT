import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";
import { UserProfile } from "@/types/define.type";
import ProfileNavLayout from "@/layout/profile-nav";
import ListProject from "@/components/project-list";
import TitleSection from "@/components/title-section";
import clsx from "clsx";
import { HeaderFont2 } from "@/font/font";

export default async function PageProfile() {
  const cookieStorage = cookies();
  const token = (await cookieStorage).get("access_token")?.value || null;
  if (!token) {
    redirect("/");
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
    {
      headers: {
        Cookie: `access_token=${token}`,
      },
      withCredentials: true,
    }
  );
  const profile: UserProfile = res.data;

  return (
    <div>
      <ProfileNavLayout profile={profile} />
      <h4
        className={clsx(
          "uppercase text-card-title-mobile text-center font-bold my-5",
          HeaderFont2.className
        )}
      >
        All project upload by {profile.name}
      </h4>
      <ListProject userId={profile.id} />
    </div>
  );
}
